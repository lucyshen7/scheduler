import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {

  const { spots, name, selected, setDay } = props;

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots
  });

  const formatSpots = (spots) => {
    if (spots === 1) {
      return "1 spot remaining";
    } else if (!spots) {
      return "no spots remaining";
    } else {
      return `${spots} spots remaining`;
    }
  }

  return (
    <li 
      className={dayClass}
      onClick={() => setDay(name)}
      >
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}