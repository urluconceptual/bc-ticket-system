import { ethers } from "ethers";
import { action, makeObservable, observable } from "mobx";
import EventManager from "../abis/EventManager.json";
import config from "../config.json";


class EventManagerStore {
  account = null;
  events = [];
  provider = null;
  activePage = "events";
  eventManager = null;
  eventIdCounter = 0;

  constructor() {

    makeObservable(this, {
      initializeProvider: action,
      account: observable,
      setAccount: action,
      loadEvents: action,
      events: observable,
      provider: observable,
      activePage: observable,
    });
  }

  initializeProvider = async () => {
    this.provider = new ethers.BrowserProvider(window.ethereum);

    const network = await this.provider.getNetwork();
    this.eventManager = new ethers.Contract(
      config[network.chainId].eventManager.address,
      EventManager,
      this.provider
    );
  };

  setAccount = (accountAddress) => {
    this.account = accountAddress;
  };

  createEvent = async (eventName, price, totalTickets) => {
    if(!this.eventManager)
      await this.initializeProvider(); 

    // Ensure that the required parameters are provided
    if (!eventName || !price || !totalTickets) {
      console.error("Missing required parameters for event creation.");
      return;
    }
    
    const eventId = this.eventIdCounter;
    this.eventIdCounter++; 

    console.log("Creating event with the following details:");
    console.log("Event id:", eventId);
    console.log("Event Name:", eventName);
    console.log("Price:", price);
    console.log("Total Tickets:", totalTickets);
  
  
    try {
      console.log("Sending transaction to create event...");
      const tx = await this.eventManager.createEvent(eventId, eventName, totalTickets, price);
      console.log("Transaction sent:", tx);
  
      console.log("Waiting for transaction to be mined...");
      await tx.wait();
  
      console.log("Transaction mined successfully!");
      console.log("Event created successfully.");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };
  
  loadEvents = async () => {

    if(!this.eventManager)
      await this.initializeProvider(); 
    await this.eventManager.getEvents().then((events) => {
      this.events = [];
      events.forEach((event) => {
        this.events.push({
          organizer: event.organizer,
          eventId: event.eventId,
          eventName: event.eventName,
          totalTickets: event.totalTickets.toString(),
          ticketsSold: event.ticketsSold.toString(),
          price: ethers.formatUnits(event.price.toString(), "ether"),
        });
      });
    });
  };


}

export const eventManagerStore = new EventManagerStore();

