// export default function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }

export function getAppointmentsForDay(state, day) {
  // console.log(state, state.day)
  const filteredDays = state.days.find(item => item.name === day);
  console.log('filteredDays', filteredDays)

  if (!filteredDays || filteredDays.length === 0) {
    return [];
  }
  return filteredDays.appointments.map(appointmentid => state.appointments[appointmentid])
}
