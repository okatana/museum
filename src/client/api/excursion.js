import {Config} from '../config';
import {fetchHelper} from './index';

export function getExcursionDates(typeId) {
  const url = Config.apiUrl() + `excursion/${typeId}/dates`;
  return fetchHelper(url);
}

export function getExcursionsForDate(typeId, dateString) {
  const url = Config.apiUrl() + `excursion/${typeId}/date/${dateString}`;
  return fetchHelper(url);
}

export function getExcursionsForDateAdmin(typeId, dateString) {
  const url = Config.apiUrl() + `excursion/${typeId}/date/${dateString}/admin`;
  return fetchHelper(url);
}
