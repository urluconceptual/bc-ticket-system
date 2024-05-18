# 🎫 Ticket-system

## Overview

  Ticket-system is a project designed for a blockchain optional course. It offers a platform for buying and selling tickets for both cinema and theater events. Using smart contracts and web3 technologies, we implemented a store that allows users browse available tickets and purchase them securely with cryptocurrency via Metamask. 

## Technologies Used

- Solidity
- Ethers.js
- React
- Hardhat

## Smart Contract Implementation

### Tickets

  The Tickets contract's main purpose is to facilitate ticket management. 

**Key Features:**
 1. Listing Tickets: The owner can list available tickets on the platform, providing information such as ID, name, category, price and stock. 
 2. Purchasing Tickets: A user can log in with their Metamask account and buy tickets to the events using cryptocurrency. 
 3. Withdrawal of Funds: The contract owner can withdraw the funds from ticket sales.
  
**Testing:**
  For this contract we implemented a handful of tests that ensure that the functionalities of the ticket contract work as expected. 

### Resale Tickets 
  This contract allows the resale of tickets on the platform. 

**Key Fatures:**
  1. Resale Ticket Listing: Ticket owners can list their tickets for resale by providing the Id of the ticket and the resale fee procentage. 
  2. Resale Price Calculation: The contracts helps calculate the new price at which the ticket is going to be sold. 

## Interacting with the Blockchain through a Web3 Application
  For our ticket-system project we chose to use React and Ethers.js to interact with the Ethereum blockchain. 

**Key Features:**
- React: We used React to build the user interface for a dymanic and responsive experience.
- ethers.js: We opted to use ethers.js for connecting to the Ethereum blockchain, interacting with the smart contracts and handling transactions. 

## Running the Project 
 1. **Run Hardhat Network:**
`npx hardhat node`
 2. **Deploy the Smart Contract:**
`npx hardhat run ./scripts/deploy.js --network localhost`
 3. **Run the Web Application:**
`npm run start`
 4. **Run the Tests:**
`npx hardhat test`
