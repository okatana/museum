import {Config} from '../config';
import {fetchHelper, fetchPostHelper} from './index';

export function addParticipant(participantOrder) {
  const url = Config.apiUrl() + 'participants';
  return fetchPostHelper(url, participantOrder);
}

export function getExcursionParticipants(excursionId) {
  const url = Config.apiUrl() + `excursion/${excursionId}/participants`;
  return fetchHelper(url);
}
