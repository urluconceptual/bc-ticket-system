// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0; 

contract TicketBooking {

    // represent the reservation thorugh a struct 
    struct Reservation
    {
        uint eventId; 
        address user; // address of the user who made the reservation
        uint nmberOfTickets;  // how many tickets where reserved
        bool paid; // if the user paid for the reservation
    }

    // mapping an id to a reservation in order to store the reservations
    mapping(uint => Reservation) public reservations; 

    // notify when a new reservation was made 
    event ReservationMade(uint reservationID, uint eventId, address user, uint numberOfTickets);

    // function for making reservations
    // external = can be called from outside the contact
    function makeReservation(uint eventId, uint numberOfTickets) external
    {
        
    }
}