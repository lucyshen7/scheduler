import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerListItem.scss";

export default function InterviewerList(props) {

  // const { days, day, setDay } = props; // expect a days array to be passed to <DayList> component as a prop
  
  // const parsedDays = days.map(item => <DayListItem key={item.id} name={item.name} spots={item.spots} selected={item.name === day} setDay={setDay} />);

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
    </section>
  );
}