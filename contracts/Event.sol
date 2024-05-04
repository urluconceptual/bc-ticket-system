// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Ticket.sol";

contract EventManager {
    address public organizer;
    uint public eventId;
    string public eventName;
    uint public totalTickets;
    uint public ticketsSold;
    uint public price;
    Ticket[] public tickets;

    event TicketsSold(uint indexed eventId, uint quantity);
    mapping(address => uint[]) ticketsOfUser;

    constructor(uint _eventId, string memory _eventName, uint _totalTickets, uint _price) {
        organizer = msg.sender;
        eventId = _eventId;
        eventName = _eventName;
        totalTickets = _totalTickets;
        price = _price;
        ticketsSold = 0;
    }

    modifier onlyOrganizer {
        require(msg.sender == organizer, "Only the organizer can perform this action");
        _;
    }

    function calculateTotalPrice(uint _quantity, uint _price) public pure returns (uint) {
        return _quantity * _price;
    }

    function sellTickets(uint _quantity) external payable onlyOrganizer {
        uint256 totalPrice = calculateTotalPrice(_quantity, price);
        require(msg.value >= totalPrice, "Insufficient payment");
        require(tickets.length + _quantity <= totalTickets, "Not enough tickets available");

        for (uint256 i = 0; i < _quantity; i++) {
            Ticket ticket = tickets[ticketsSold + i];
            ticket.transfer(msg.sender);
            ticketsOfUser[msg.sender].push(ticketsSold + i);
        }

        ticketsSold += _quantity;
        emit TicketsSold(eventId, _quantity);
    }

    function transferTicket(uint _ticketIndex, address _newOwner) external {
        require(_ticketIndex < tickets.length, "Invalid ticket index");
        
        Ticket ticket = tickets[_ticketIndex];
        ticket.transfer(_newOwner);
        ticketsOfUser[_newOwner].push(_ticketIndex);
    }

    function getAvailableTickets() public view returns (uint) {
        return totalTickets - ticketsSold;
    }

    function getTicketOwner(uint _ticketIndex) public view returns (address) {
        require(_ticketIndex < tickets.length, "Invalid ticket index");
        
        return tickets[_ticketIndex].owner();
    }
}