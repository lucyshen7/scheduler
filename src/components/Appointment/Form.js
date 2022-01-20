// import React, { useState } from "react";

import React from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import InterviewerListItem from "components/InterviewerListItem";

export default function Form(props) {

  // const [text, setText] = useState('');

  // const setName = () => {
  //   setText(text);
  // }

  const { student, value, interviewers, onChange, onCancel } = props;

  const parsedInterviewers = interviewers.map(item =>
    <InterviewerListItem
      key={item.id}
      name={item.name}
      avatar={item.avatar}
      setInterviewer={() => onChange(item.id)}
      selected={item.id === value}
    />)

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={student}
            // onChange={(event) => setText(event.target.value)}
            type="text"
            placeholder={!student && "Enter Student Name"}
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={value}
          onChange={onChange}
        >
          { parsedInterviewers }
        </InterviewerList>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={onCancel}>Cancel</Button>
          <Button confirm onClick={onChange}>Save</Button>
        </section>
      </section>
    </main>
  )
}