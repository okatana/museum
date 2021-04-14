
const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export function dateWithWeekDay(dateString) {
  const date = new Date(dateString);
  return `${weekDays[date.getDay()]} ${dateString}`;
}

export function formatDateString(dateString) {
  return formatDate(new Date(dateString));
}

export function formatDate(date) {
  //const date = new Date(dateString);
  const offset = date.getTimezoneOffset();
  const _date = new Date(date.getTime() - (offset*60*1000))
  return _date.toISOString().slice(0, 10);
}

export function formatTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

export function assert(condition, message) {
  if (!condition) {
    throw message || "Assertion failed";
  }
}
