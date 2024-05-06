import { action, makeObservable, observable } from "mobx";

class EventManagerStore {
  account = null;
  constructor() {
    makeObservable(this, {
      account: observable,
      setAccount: action,
    });
  }

  setAccount = (accountAddress) => {
    this.account = accountAddress;
  };
}

export const eventManagerStore = new EventManagerStore();
