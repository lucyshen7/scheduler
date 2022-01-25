import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ])
      .then(([days, appointments, interviewers]) => {
        setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data }));
      });
  }, []);

  const updateSpots = () => { // returns the current value
    const appointmentArr = state.days.find(element => element.name === state.day);
    const result = appointmentArr.appointments.filter(appointmentid => state.appointments[appointmentid].interview);
    return 5 - result.length;
  }

  // Creating appointments function
  function bookInterview(id, interview) {
    let spots; // set spots as accessible variable

    if (!state.appointments[id].interview) { // need to check first if the interview is null, look in dev tools components
      spots = updateSpots() - 1; // decrement if interview is null
    } else {
      spots = updateSpots(); // leave as is if interview already exists
    }

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = state.days.map(day => { return { ...day } })
    days.find(day => day.name === state.day).spots = spots;

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState(prev => ({ // call setState with new state object
          ...prev,
          appointments,
          days
        }));
      })
  }

  // Deleting appointments function
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const spots = updateSpots() + 1;
    const days = state.days.map(day => { return { ...day } })
    days.find(day => day.name === state.day).spots = spots;

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState(prev => ({ // call setState with new state object
          ...prev,
          appointments,
          days
        }));
      })
  }

  return { state, setDay, bookInterview, cancelInterview };
}
