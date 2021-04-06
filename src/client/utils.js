
const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export function dateWithWeekDay(dateString) {
  const date = new Date(dateString);
  return `${weekDays[date.getDay()]} ${dateString}`;
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 10);
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
