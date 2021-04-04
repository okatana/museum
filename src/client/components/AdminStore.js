import {makeObservable, action, computed, observable, runInAction} from "mobx";

import {assert} from '../utils';

export const screens = {
  DATES: 'DATES',
  TIMES: 'TIMES',
};

class Store {
  screen = screens.TIMES;
  selectedDate = null;


  constructor() {
    makeObservable(this, {
      screen: observable,
      selectedDate: observable,
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
