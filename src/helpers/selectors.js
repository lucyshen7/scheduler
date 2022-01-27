export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find(item => item.name === day);

  if (!filteredDays || filteredDays.length === 0) {
    return [];
  }
  
  return filteredDays.appointments.map(appointmentid => state.appointments[appointmentid]);
};

export function getInterviewersForDay(state, day) {
   const filteredDays = state.days.find(item => item.name === day);
 
   if (!filteredDays || filteredDays.length === 0) {
     return [];
   }

   return filteredDays.interviewers.map(interviewerid => state.interviewers[interviewerid]);
};

export function getInterview(state, interview) {
  
  if (!interview) {
    return null;
  }

  const interviewerKey = interview.interviewer;
  const studentName = interview.student;
  
  const obj = { student: studentName, interviewer: state.interviewers[interviewerKey] };

  return obj;
};