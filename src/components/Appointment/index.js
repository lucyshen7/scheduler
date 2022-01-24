import React, { useEffect } from "react";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";

export default function Appointment(props) {
  // when props.interview contains a value, pass useVisualMode the SHOW mode
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const SAVING = "SAVING";

  const { id, time, interview, interviewers, bookInterview } = props;

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING); // show the SAVING indicator before calling props.bookInterview
    bookInterview(id, interview) // is this a promise? How do I turn this into a promise
      .then(() => transition(SHOW));
    
  }

  const CREATE = "CREATE";

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === SAVING && <Status message={"Please wait..."} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form id={id} interviewers={interviewers} onCancel={back} onSave={save} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
        />
      )}
    </article>
  )
}