import React from "react";
import "./styles.scss";

export default function Appointment(props) {

  const { time } = props;

  return (
    <article className="appointment">
      { !time && <span>No Appointments</span>}
      { time && <span>Appointment at {time}</span>}
    </article>
  )
}