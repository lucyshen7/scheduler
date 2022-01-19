import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const { days, day, setDay } = props; // expect a days array to be passed to <DayList> component as a prop

  const parsedDays = days.map(item =>
    <DayListItem
      key={item.id}
      name={item.name}
      spots={item.spots}
      selected={item.name === day}
      setDay={() => setDay(item.name)}
    />
  );

  return (
    <ul>
      {parsedDays}
    </ul>
  );
}