import React from "react";
import "./styles.scss";

import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const CREATE = "CREATE";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;

  const { mode, transition, back } = useVisualMode( // when props.interview contains a value, pass useVisualMode the SHOW mode
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    bookInterview(id, interview) // returns axios promise
      .then(() => transition(SHOW))
      .catch(err => transition(ERROR_SAVE, true));
  }

  function confirm() {
    transition(CONFIRM);
  }

  function cancel() {
    transition(DELETING, true);

    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(err => transition(ERROR_DELETE, true));
  }

  function edit() {
    transition(EDIT);
  }

  return (
    <article className="appointment">
      <Header time={time} />

      {mode === ERROR_DELETE && <Error message="Could not cancel appointment." onClose={() => transition(SHOW)} />}

      {mode === ERROR_SAVE && <Error message="Could not save appointment." onClose={back} />}

      {mode === SAVING && <Status message="Saving" />}
      
      {mode === DELETING && <Status message="Deleting" />}

      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" onConfirm={cancel} onCancel={back} />}

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === CREATE && <Form id={id} interviewers={interviewers} onCancel={back} onSave={save} />}

      {mode === EDIT && (
        <Form
          id={id}
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
          student={interview.student}
          interviewer={interview.interviewer.id}
        />
      )}

      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          interview={interview}
          onDelete={confirm}
          onEdit={edit}
        />
      )}

    </article>
  )
}