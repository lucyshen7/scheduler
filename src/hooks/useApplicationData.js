import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([ // api call to fetch application data
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then(([days, appointments, interviewers]) => {
        setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data }));
      });
  }, []);

  const getSpotsForDay = (day, appointments) => {
    let spots = 0;
    for (const id of day.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      };
    };
    return spots;
  }

  const updateSpots = (state, appointments, id) => {
    const dayObj = state.days.find(day => day.name === state.day);
    const spots = getSpotsForDay(dayObj, appointments);

    const day = {...dayObj, spots};
    return state.days.map(d => d.name === state.day ? day : d);
  }

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const newDays = updateSpots(state, appointments, id);

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState(prev => ({
          ...prev,
          appointments,
          days: newDays
        }));
      })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const newDays = updateSpots(state, appointments, id);

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState(prev => ({
          ...prev,
          appointments,
          days: newDays
        }));
      })
  }

  return { state, setDay, bookInterview, cancelInterview };
}
