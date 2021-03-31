import {makeObservable, action, computed, observable, runInAction} from "mobx";

import {assert} from '../utils';

export const screens = {
  DATES: 'DATES',
  TIMES: 'TIMES',
  ORDER: 'ORDER',
};

class Store {
  screen = screens.DATES;
  selectedDate = null;
  selectedExcursion = null;

  constructor() {
    makeObservable(this, {
      screen: observable,
      selectedDate: observable,
      selectedExcursion: observable,
      setScreen: action,
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

  setSelectedExcursion(excursion) {
    this.selectedExcursion = excursion;
  }
}

export const store = new Store();
