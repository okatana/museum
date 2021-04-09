import {getExcursionDates, getExcursionsForDate, getExcursionsForDateAdmin, addScheduledExcurions} from './excursion';
import {addParticipant, getExcursionParticipants} from './participant';

export function fetchHelper(url) {
  const request = new Request(url);
  return (
    fetch(request)
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          return response.text().then((text) => {
            console.error('error response=', text);
            throw new Error('Request failed');
          });
        }
      })
      .then((text) => JSON.parse(text))
      .catch((error) => {
        console.error(error);
        throw error;
      })
  );
}

export function fetchPostHelper(url, data, method='POST') {
  return (
    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status === 201) {
          return;
        } else {
          return response.json();
        }
      })
      .catch((error) => {
        console.error(error);
        throw error;
      })
  )
}

export {getExcursionDates, getExcursionsForDate, getExcursionsForDateAdmin, addScheduledExcurions,
  addParticipant, getExcursionParticipants};
