import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import InterviewerListItem from "components/InterviewerListItem";

export default function Form(props) {

  const { interviewers, onSave, onCancel } = props;

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    onCancel();
  }

  function validate() { // validates input before saving in the Form component
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    onSave(student, interviewer);
  }

  const parsedInterviewers = interviewers.map(item =>
    <InterviewerListItem
      key={item.id}
      name={item.name}
      avatar={item.avatar}
      setInterviewer={() => setInterviewer(item.id)}
      selected={item.id === interviewer}
    />
  )

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={student}
            onChange={event => {
              setStudent(event.target.value);
            }}
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        >
          {parsedInterviewers}
        </InterviewerList>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  )
};