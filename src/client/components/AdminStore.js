import {makeObservable, action, computed, observable, runInAction} from "mobx";

import {assert} from '../utils';

export const screens = {
  MAIN: 'MAIN',
  TYPES: 'TYPES',
  DATES: 'DATES',
  TIMES: 'TIMES',
  EXCURSION: 'EXCURSION',
  SCHEDULE: 'SCHEDULE',
};

class Store {
  //screen = screens.TIMES;
  screen = null;
  selectedDate = null;
  excursionType = null;
  excursionData = observable({}, {proxy: false});

  constructor() {
    makeObservable(this, {
      screen: observable,
      selectedDate: observable,
      excursionType: observable,
      setSelectedDate: action,
      setExcursionType: action,
      setExcursionData: action,
    });
  }

  setScreen(screen) {
    assert(screen in screens, `Invalid screen "${screen}"`);
    this.screen = screen;
  }

  setSelectedDate(date) {
    this.selectedDate = date;
  }

  setExcursionType(excursionType) {
    this.excursionType = excursionType;
  }

  setExcursionData(excursionData) {
    console.log('STORE setExcursionData', excursionData);
    this.excursionData = excursionData;
  }

}

export const store = new Store();
