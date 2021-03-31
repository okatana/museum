import {Config} from '../config';
import {fetchHelper} from './index';

export function getExcursionDates(typeId) {
  const url = Config.apiUrl + `excursion/${typeId}/dates`;
  return fetchHelper(url);
}
