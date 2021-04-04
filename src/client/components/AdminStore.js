import {makeObservable, action, computed, observable, runInAction} from "mobx";

import {assert} from '../utils';

export const screens = {
  DATES: 'DATES',
  TIMES: 'TIMES',
};

class Store {
  screen = screens.DATES;
  selectedDate = null;


  constructor() {
    makeObservable(this, {
      screen: observable,
      setSelectedDate: action,
    });
  }

  setScreen(screen) {
    assert(screen in screens, `Invalid screen "${screen}"`);
    this.screen = screen;
  }

  setSelectedDate(date) {
    this.selectedDate = date;
  }

}

export const store = new Store();
