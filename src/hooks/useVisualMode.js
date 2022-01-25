import { useEffect, useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    setMode(newMode);

    if (replace) { // transition with replace
      const history2 = [...history.slice(0, history.length - 1)]; // remove last item
      setHistory([...history2, newMode]); // add newMode to history array
      
    } else {
      const history2 = [...history, newMode];
      setHistory(history2);
    }

  };

  const back = function () {

    if (history.length > 1) { // back limit
      const history2 = [...history.slice(0, history.length - 1)];
      const lastItem = history2[history2.length - 1];

      setHistory(history2);
      setMode(lastItem);
    }
  }

  return { mode, transition, back };
};