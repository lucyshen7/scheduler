import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    setMode(newMode);

    if (replace) {
      setHistory(prev => ([...prev.slice(0, prev.length - 1), newMode])); // replace last item in history array with newMode
    } else {      
      setHistory(prev => ([...prev, newMode]));
    }

  };

  const back = function () {

    if (history.length > 1) {
      setMode(history[history.length - 2]); // set mode to previous item in history array

      setHistory(prev => ([...prev.slice(0, prev.length - 1)])); // remove last item in history array
    } else {
      return;
    }
  };

  return { mode, transition, back };
};