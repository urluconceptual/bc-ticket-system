// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface ITicket {
    function transfer(address _newOwner) external;
    function getOwner() external view returns (address);
    function getSeatNumber() external view returns (uint);
    function isTicketAvailable() external view returns (bool);
}
