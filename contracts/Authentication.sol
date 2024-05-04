// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0; 

contract Authentication {
    mapping(address => bool) private authorizedUsers;
    address private owner;

    constructor() {
        owner = msg.sender;
        authorizedUsers[owner] = true;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier onlyAuthorized {
        require(isAuthorized(msg.sender), "You are not authorized");
        _;
    }

    function authorizeUser(address _user) public onlyOwner {
        authorizedUsers[_user] = true;
    }

    function removeUser(address _user) public onlyOwner {
        authorizedUsers[_user] = false;
    }

    function isAuthorized(address _user) public view returns (bool) {
        return authorizedUsers[_user];
    }
}