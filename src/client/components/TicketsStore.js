import {makeObservable, action, computed, observable, runInAction} from "mobx";

import {assert} from '../utils';

export const screens = {
  DATES: 'DATES',
  TIMES: 'TIMES',
  ORDER: 'ORDER',
  ORDERING: 'ORDERING',
};

class Store {
  screen = screens.DATES;
  selectedDate = null;
  selectedExcursion = null;
  order = null;
  get ticketsAvailable() {
    if (this.selectedExcursion) {
      const {participants_limit, sold, reserved} = this.selectedExcursion;
      return Math.max(participants_limit - sold - reserved, 0);
    } else {
      return 0;
    }
  }
  get ticketsOrdered() {
    if (this.order) {
      return this.order.fullcost + this.order.discount + this.order.free;
    } else {
      return 0;
    }
  }

  constructor() {
    makeObservable(this, {
      screen: observable,
      selectedDate: observable,
      selectedExcursion: observable,
      order: observable,
      ticketsAvailable: computed,
      ticketsOrdered: computed,
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

  setOrder(order) {
    this.order = order;
  }
}

export const store = new Store();
