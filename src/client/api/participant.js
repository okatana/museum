import {Config} from '../config';
import {fetchHelper, fetchPostHelper} from './index';

export function addParticipant(participantOrder) {
  const url = Config.apiUrl + 'participants';
  return fetchPostHelper(url, participantOrder);
}
