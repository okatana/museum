import {makeObservable, action, computed, observable, runInAction} from "mobx";

export const screens = {
  DATES: 'DATES',
  TIMES: 'TIMES',
  ORDER: 'ORDER',
};

class Store {
  //@observable screen = screens[0];
  screen = screens.DATES;

  constructor() {
    makeObservable(this, {
      screen: observable
    });
  }

}

export const store = new Store();
