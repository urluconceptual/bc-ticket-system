// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IEvent {
    struct EventInfo {
        address organizer;
        uint eventId;
        string eventName;
        uint totalTickets;
        uint ticketsSold;
        uint price;
    }

    function sellTickets(uint _quantity) external payable;
    function transferTicket(uint _ticketIndex, address _newOwner) external;
    function getAvailableTickets() external view returns (uint);
    function getTicketOwner(uint _ticketIndex) external view returns (address);
    function withdrawFunds() external;
    function getEventInfo() external view returns (EventInfo memory);
}
