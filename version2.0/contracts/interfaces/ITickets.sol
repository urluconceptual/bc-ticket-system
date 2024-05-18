// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface ITickets {
    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        uint256 _price,
        uint256 _stock
    ) external;

    function buy(uint256 _id) external payable;

    function withdraw() external;
    
}
