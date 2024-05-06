import { ethers } from "ethers";
import { action, makeObservable, observable } from "mobx";
import EventManager from "../abis/EventManager.json";
import config from "../config.json";

class EventManagerStore {
  account = null;
  events = [];
  provider = null;

  constructor() {
    makeObservable(this, {
      account: observable,
      setAccount: action,
      loadEvents: action,
      events: observable,
      provider: observable,
    });
  }

  setAccount = (accountAddress) => {
    this.account = accountAddress;
  };

  loadEvents = async () => {
    this.provider = new ethers.BrowserProvider(window.ethereum);

    const network = await this.provider.getNetwork();
    const eventManager = new ethers.Contract(
      config[network.chainId].eventManager.address,
      EventManager,
      this.provider
    );

    const events = await eventManager.getEvents();
    console.log(events);
  };
}

export const eventManagerStore = new EventManagerStore();
