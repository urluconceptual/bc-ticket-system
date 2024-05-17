const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

// constants for listing tickets
const ID = 1;
const NAME = "Batman";
const CATEGORY = "Cinema";
const PRICE = tokens(1);
const STOCK = 5;

describe("Ticket-system", () => {
  let ticketsContract
  let deployer, buyer

  beforeEach(async () => {
    // setup accounts 
    //console.log(await ethers.getSigners())
    [deployer, buyer] = await ethers.getSigners()
    //console.log("Deployer: ", deployer.address, "\nBuyer: ", buyer.address)

    // deploy the contract
    const TicketsContract = await ethers.getContractFactory("Tickets")
    ticketsContract = await TicketsContract.deploy()
  })

  describe("Deployment", () => {
    it("Sets the owner", async () =>{
      expect (await ticketsContract.owner()).to.equal(deployer.address)
    })
  })

  describe("Listing", () => {
    let transaction
    beforeEach(async () => {
      transaction = await ticketsContract
        .connect(deployer)
        .list(
          ID, 
          NAME, 
          CATEGORY, 
          PRICE, 
          STOCK);

      await transaction.wait();

     
    });

    it("Returns ticket attributes", async () => {
      const ticket = await ticketsContract.tickets(ID);
      expect(ticket.id).to.equal(ID);
      expect(ticket.name).to.equal(NAME);
      expect(ticket.category).to.equal(CATEGORY);
      expect(ticket.price).to.equal(PRICE);
      expect(ticket.stock).to.equal(STOCK);

    });

    it("Emits List event", () => {
      expect(transaction).to.emit(ticketsContract, "List"); 
    })
  })

  describe("Buying", () => {
    let transaction

    beforeEach(async () => {
      // list a ticket 
      transaction = await ticketsContract
        .connect(deployer)
        .list(
          ID, 
          NAME, 
          CATEGORY, 
          PRICE, 
          STOCK);

      await transaction.wait();

      // buy the ticket
      transaction = await ticketsContract.connect(buyer).buy(ID, {value:PRICE})
     
    });

    it("Updates the contract balance", async() => {
      const result = await ethers.provider.getBalance(ticketsContract.address)
      expect(result).to.equal(PRICE)
    })

    it("Updates buyer's order count", async() => {
      const result = await ticketsContract.orderCount(buyer.address)
      expect(result).to.equal(1)
    })

    it("Adds the order", async() => {
      const order = await ticketsContract.orders(buyer.address, 1)

      expect(order.time).to.be.greaterThan(0)
      expect(order.ticket.name).to.equal(NAME)
    })

    it("Emits Buy event", () => {
      expect(transaction).to.emit(ticketsContract, "Buy")
    })

})

describe("Withdrawing funds", () => {
  let balanceBefore;

  beforeEach(async () => {
    // list a ticket 
    let transaction = await ticketsContract
      .connect(deployer)
      .list(
        ID, 
        NAME, 
        CATEGORY, 
        PRICE, 
        STOCK);

    await transaction.wait();

    // buy a ticket 
    transaction = await ticketsContract.connect(buyer).buy(ID, {value: PRICE} ); 

    // get the balance before we withdraw the funds
    balanceBefore = await ethers.provider.getBalance(deployer.address); 

    // withdraw funds
    transaction = await ticketsContract.connect(deployer).withdraw()
    await transaction.wait()

  });

  it("Updates the owner balance", async() => {
    const balanceAfter = await ethers.provider.getBalance(deployer.address); 
    expect(balanceAfter).to.be.greaterThan(balanceBefore)
  })

  it("Updates the contract balance", async() => {
    const result = await ethers.provider.getBalance(ticketsContract.address)
    expect(result).to.be.equal(0); 
  })
})

})