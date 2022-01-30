// Helper Functions

// getAppointmentsForDay - Takes days array and returns array of appointment objects

export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find(item => item.name === day);

  if (!filteredDays || filteredDays.length === 0) {
    return [];
  }

  return filteredDays.appointments.map(appointmentid => state.appointments[appointmentid]);
};

// getInterviewersForDay - Takes days array and returns array of interviewer objects

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.find(item => item.name === day);

  if (!filteredDays || filteredDays.length === 0) {
    return [];
  }

  return filteredDays.interviewers.map(interviewerid => state.interviewers[interviewerid]);
};

// getInterview - Takes interview obj with interviewer id and student name, and returns new obj with interviewer name and student name

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  const interviewerKey = interview.interviewer;
  const studentName = interview.student;

  const obj = { student: studentName, interviewer: state.interviewers[interviewerKey] };

  return obj;
};