import {makeObservable, action, computed, observable, runInAction} from "mobx";

import {assert} from '../utils';

export const screens = {
  DATES: 'DATES',
  TIMES: 'TIMES',
};

class Store {
  //screen = screens.TIMES;
  screen = null;
  selectedDate = null;
  excursionType = null;

  constructor() {
    makeObservable(this, {
      screen: observable,
      selectedDate: observable,
      excursionType: observable,
      setSelectedDate: action,
      setExcursionType: action,
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

}

export const store = new Store();
