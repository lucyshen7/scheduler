import React, { useEffect } from "react";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) {
  // when props.interview contains a value, pass useVisualMode the SHOW mode
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const CREATE = "CREATE";

  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING); // show the SAVING indicator before calling props.bookInterview
    bookInterview(id, interview) // returns axios promise
      .then(() => transition(SHOW));
  }

  function confirm() {
    transition(CONFIRM);
  }

  function cancel(interview) {
    transition(DELETING);
    cancelInterview(id, interview)
      .then(() => transition(EMPTY));
  }

  function edit() {
    transition(EDIT);
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={cancel}
          onCancel={back}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form id={id} interviewers={interviewers} onCancel={back} onSave={save} />}
      {mode === EDIT && (
        <Form
          id={id}
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
          student={interview.student}
          interviewer={interview.interviewer.id} // send the interviewer id
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