// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./interfaces/ITicket.sol";
import "./interfaces/IEvent.sol";
import "./libraries/TicketLibrary.sol";

contract Event is IEvent {
    address public organizer;
    uint public eventId;
    string public eventName;
    uint public totalTickets;
    uint public ticketsSold;
    uint public price;
    ITicket[] public tickets;

    event TicketsSold(uint indexed eventId, uint quantity);
    event FundsWithdrawn(address indexed organizer, uint amount);
    mapping(address => uint[]) ticketsOfUser;

    constructor(
        uint _eventId,
        string memory _eventName,
        uint _totalTickets,
        uint _price,
        address _organizer
    ) {
        organizer = _organizer;
        eventId = _eventId;
        eventName = _eventName;
        totalTickets = _totalTickets;
        price = _price;
        ticketsSold = 0;
    }

    modifier onlyOrganizer() {
        require(
            msg.sender == organizer,
            "Only the organizer can perform this action"
        );
        _;
    }

    function sellTickets(uint _quantity) external payable onlyOrganizer {
        uint256 totalPrice = TicketLibrary.calculateTotalPrice(
            _quantity,
            price
        );
        require(msg.value >= totalPrice, "Insufficient payment");
        require(
            tickets.length + _quantity <= totalTickets,
            "Not enough tickets available"
        );

        for (uint256 i = 0; i < _quantity; i++) {
            ITicket ticket = tickets[ticketsSold + i];
            ticket.transfer(msg.sender);
            ticketsOfUser[msg.sender].push(ticketsSold + i);
        }

        ticketsSold += _quantity;
        emit TicketsSold(eventId, _quantity);
    }

    function transferTicket(uint _ticketIndex, address _newOwner) external {
        require(_ticketIndex < tickets.length, "Invalid ticket index");

        ITicket ticket = tickets[_ticketIndex];
        ticket.transfer(_newOwner);
        ticketsOfUser[_newOwner].push(_ticketIndex);
    }

    function getAvailableTickets() public view returns (uint) {
        return totalTickets - ticketsSold;
    }

    function getTicketOwner(uint _ticketIndex) public view returns (address) {
        require(_ticketIndex < tickets.length, "Invalid ticket index");

        return tickets[_ticketIndex].getOwner();
    }

    receive() external payable {}

    function withdrawFunds() external onlyOrganizer {
        uint balance = address(this).balance;
        require(balance > 0, "No funds available for withdrawal");

        payable(organizer).transfer(balance);
        emit FundsWithdrawn(organizer, balance);
    }

    function getEventInfo() external view returns (EventInfo memory) {
        return
            EventInfo({
                organizer: organizer,
                eventId: eventId,
                eventName: eventName,
                totalTickets: totalTickets,
                ticketsSold: ticketsSold,
                price: price
            });
    }
}
