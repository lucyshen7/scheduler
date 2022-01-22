// export default function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }

export function getAppointmentsForDay(state, day) {
  // console.log(state, state.day)
  const filteredDays = state.days.find(item => item.name === day);
  // console.log('filteredDays', filteredDays)

  if (!filteredDays || filteredDays.length === 0) {
    return [];
  }
  return filteredDays.appointments.map(appointmentid => state.appointments[appointmentid])
};

// getInterviewersForDay

export function getInterviewersForDay(state, day) {
   const filteredDays = state.days.find(item => item.name === day);
 
   if (!filteredDays || filteredDays.length === 0) {
     return [];
   }

   return filteredDays.interviewers.map(interviewerid => state.interviewers[interviewerid])
};

export function getInterview(state, interview) {

  // console.log(state, interview)
  
  if (!interview) {
    return null;
  }

  const interviewerKey = interview.interviewer;
  const studentName = interview.student
  
  const obj = { student: studentName, interviewer: state.interviewers[interviewerKey] }

  // console.log('obj', obj)

  return obj;
};
/*

{
  "id":1,
  "time":"12pm",
  "interview": {
    "student": "Lydia Miller-Jones",
    "interviewer": 1
  }
}

*/
