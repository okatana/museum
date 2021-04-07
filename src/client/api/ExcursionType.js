import {Config} from '../config';
import {fetchHelper} from './index';

export default class ExcursionType {
  constructor(data) {
    Object.keys(data).map((key) => {
      if (key ==='options') {
        this[key] = JSON.parse(data[key]);
      } else {
        this[key] = data[key];
      }
    })
  }

  static load(typeId) {
    const url = Config.apiUrl() + `excursion_type/${typeId}`;
    return fetchHelper(url)
      .then(data => {
        console.log('ExcursionType::load()', data);
        return new ExcursionType(data);
      })
      .catch(error => {
        console.log('ExcursionType::load() ERROR', error);
        return null;
      });
  }

  static getExcursionTypes() {
    const url = Config.apiUrl() + `excursion_types`;
    return fetchHelper(url);
  }

  getTicketsCost() {
    //console.log('this.options', this.options);
    return this.options.tickets;
  }
}
