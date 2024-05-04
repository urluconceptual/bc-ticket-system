// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "../interfaces/ITicket.sol";
import "../libraries/TicketLibrary.sol";

contract Ticket is ITicket {
    address public owner;
    uint public seatNumber;
    bool public isAvailable;

    event TicketTransferred(address indexed previousOwner, address indexed newOwner);

    constructor(address _owner, uint _seatNumber) {
        owner = _owner;
        seatNumber = _seatNumber;
        isAvailable = true;
    }

    function transfer(address _newOwner) external override {
        require(msg.sender == owner, "You are not the owner of this ticket");
        owner = _newOwner;
        isAvailable = false;
        emit TicketTransferred(msg.sender, _newOwner);
    }

    function getOwner() external view override returns (address) {
        return owner;
    }

    function getSeatNumber() external view override returns (uint) {
        return seatNumber;
    }

    function isTicketAvailable() external view override returns (bool) {
        return isAvailable;
    }
}
