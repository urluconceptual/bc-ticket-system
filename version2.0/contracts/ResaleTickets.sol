// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./interfaces/ITickets.sol";
import "./Tickets.sol";

contract TicketResale {
    address seller;
    ITickets public ticketsContract;
    uint256 public resaleTicketCount;

    struct ResaleTicket {
        uint256 ticketId;
        string name;
        string category;
        uint256 price;
    }

    constructor(address _ticketsContractAddress) {
        seller = msg.sender;
        ticketsContract = Tickets(_ticketsContractAddress);
    }

    mapping(uint256 => ResaleTicket) public resaleTickets;

    function getResaleTicket(
        uint256 _resaleId
    ) public view returns (ResaleTicket memory) {
        return resaleTickets[_resaleId];
    }

    function calculateResalePrice(
        uint256 _price,
        uint256 _feePercent
    ) public pure returns (uint256) {
        require(_feePercent <= 100, "Fee percentage cannot be more than 100");
        return (_price + (_price * _feePercent) / 100);
    }

    function listResaleTickets(uint256 _ticketId, uint256 _feePrecent) public {
        ITickets.Ticket memory ticket = ticketsContract.getTicketById(
            _ticketId
        );
        ResaleTicket memory resaleTicket = ResaleTicket(
            _ticketId,
            ticket.name,
            ticket.category,
            calculateResalePrice(
                ticket.price,
                _feePrecent
            )
        );

        resaleTicketCount++;
        resaleTickets[resaleTicketCount] = resaleTicket;
    }
}
