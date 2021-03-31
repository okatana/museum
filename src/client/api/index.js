import {getExcursionDates} from './excursion';

export const fetchHelper = (url) => {
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

export {getExcursionDates};
