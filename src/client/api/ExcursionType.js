import {Config} from '../config';
import {fetchHelper, fetchPostHelper} from './index';

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

  static postExcursionType(typeData) {
    console.log('ExcursionType.postExcursionType typeData=', typeData);
    const url = Config.apiUrl() + `excursion_type`;
    return fetchPostHelper(url, typeData);
  }
  static putExcursionType(typeId, typeData) {
    console.log('ExcursionType.putExcursionType typeData=', typeData);
    const url = Config.apiUrl() + `excursion_type/${typeId}`;
    return fetchPostHelper(url, typeData, 'PUT');
  }

  getTicketsCost() {
    //console.log('this.options', this.options);
    return this.options.tickets;
  }
}
