// export default function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }

export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(item => item.name === day);
  return filteredDays;
}