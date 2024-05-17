// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./interfaces/IEvent.sol";
import "./Event.sol";

contract EventManager {
    address private owner;
    IEvent[] public events;

    event EventCreated(
        uint indexed eventId,
        string eventName,
        uint totalTickets,
        uint price
    );

    constructor() {
        owner = msg.sender;
    }

    function getOwner() external view returns (address) {
        return owner;
    }

    function createEvent(
        uint _eventId,
        string memory _eventName,
        uint _totalTickets,
        uint _price
    ) external {
        IEvent newEvent = new Event(
            _eventId,
            _eventName,
            _totalTickets,
            _price,
            msg.sender
        );
        events.push(newEvent);
        emit EventCreated(_eventId, _eventName, _totalTickets, _price);
    }

    function getEvents() external view returns (IEvent.EventInfo[] memory) {
        IEvent.EventInfo[] memory eventInfos = new IEvent.EventInfo[](
            events.length
        );
        for (uint i = 0; i < events.length; i++) {
            eventInfos[i] = events[i].getEventInfo();
        }
        return eventInfos;
    }
}
