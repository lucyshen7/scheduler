import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {

  const { interviewers, value, onChange } = props; // expect an interviewers array to be passed to <InterviewerList> component as a prop

  const parsedInterviewers = interviewers.map(item =>
    <InterviewerListItem
      key={item.id}
      name={item.name}
      avatar={item.avatar}
      setInterviewer={() => onChange(item.id)}
      selected={item.id === value}
    />
  );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewers}
      </ul>
    </section>
  );
}