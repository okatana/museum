import {Config} from '../config';
import {fetchHelper} from './index';


export default class ExcursionType {
  constructor(data) {
    Object.keys(data).map((key, value) => {
      this[key] = value;
    })
/*
    this.id = data.id;
    this.name = data.name;
    this.id = data.id;
    this.id = data.id;
    this.id = data.id;
*/
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
}
