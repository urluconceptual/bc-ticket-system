// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

library TicketLibrary {
    function calculateTotalPrice(uint _quantity, uint _price) internal pure returns (uint) {
        return _quantity * _price;
    }
}