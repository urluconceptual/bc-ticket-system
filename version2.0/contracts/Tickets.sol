// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./interfaces/ITickets.sol";

contract Tickets is ITickets {
    address public owner;

    struct Ticket {
        uint256 id;
        string name;
        string category;
        uint256 price;
        uint256 stock;
    }

    struct Order {
        uint256 time;
        Ticket ticket;
    }

    // mappings
    mapping(uint256 => Ticket) public tickets;
    mapping(address => uint256) public orderCount;
    mapping(address => mapping(uint256 => Order)) public orders; // nested mapping

    // events
    event List(string name, uint256 price, uint256 quantity);
    event Buy(address buyer, uint orderId, uint256 ticketId);

    // modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        // run before function body
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // listing the tickets
    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        uint256 _price,
        uint256 _stock
    ) public onlyOwner {
        // create ticket struct
        Ticket memory ticket = Ticket(_id, _name, _category, _price, _stock);

        // save the ticket to the blockchain
        tickets[_id] = ticket;

        // emit event
        emit List(_name, _price, _stock);
    }

    // buy tickets
    function buy(uint256 _id) public payable {
        // get the ticket
        Ticket memory ticket = tickets[_id];

        require(msg.value >= ticket.price);
        require(ticket.stock > 0);

        // create an order
        Order memory order = Order(block.timestamp, ticket);

        // save the order on the blockchain
        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = order;

        // update stock
        tickets[_id].stock = ticket.stock - 1;

        // emit event
        emit Buy(msg.sender, orderCount[msg.sender], ticket.id);
    }

    // withdraw funds
    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }

    function getTicketById(uint256 _id) public view returns (Ticket memory) {
        require(tickets[_id].id != 0, "Ticket does not exist");
        return tickets[_id];
    }
}
