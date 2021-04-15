import {Config} from '../config';
import {fetchHelper, fetchPostHelper} from './index';

export function getExcursionDates(typeId) {
  const url = Config.apiUrl() + `excursion/${typeId}/dates`;
  return fetchHelper(url);
}

export function getExcursionDatesAllTypes() {
  const url = Config.apiUrl() + `excursion/dates/all-types`;
  return fetchHelper(url);
}

export function getExcursionsForDate(typeId, dateString) {
  const url = Config.apiUrl() + `excursion/${typeId}/date/${dateString}`;
  return fetchHelper(url);
}

export function getExcursionsForDateAdminAllTypes(dateString) {
  const url = Config.apiUrl() + `excursion/all-types/date/${dateString}/admin`;
  return fetchHelper(url);
}

export function getExcursionsForDateAdmin(typeId, dateString) {
  const url = Config.apiUrl() + `excursion/${typeId}/date/${dateString}/admin`;
  return fetchHelper(url);
}

export function addScheduledExcurions(scheduleData) {
  const url = Config.apiUrl() + 'excursions/schedule';
  return fetchPostHelper(url, scheduleData);
}

export function getExcursionOfficeTickets(excursionId) {
  const url = Config.apiUrl() + `excursion/${excursionId}/office-tickets`;
  return fetchHelper(url);
}

export function sellOfficeTickets(excursionId, tickets) {
  console.log('sellOfficeTickets()', excursionId, tickets);
  const url = Config.apiUrl() + `excursion/${excursionId}/office-tickets`;
  return fetchPostHelper(url, tickets, 'PUT');
}
