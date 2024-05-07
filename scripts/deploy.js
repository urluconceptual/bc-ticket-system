const hre = require("hardhat");
const ethers = hre.ethers;

const tokens = (n) => {
  return hre.ethers.parseUnits(n.toString(), "ether");
};

const EVENTS = [
  {
    id: 1,
    name: "Event 1",
    ticketPrice: tokens(1),
    totalTickets: 3,
  },
  {
    id: 2,
    name: "Event 2",
    ticketPrice: tokens(2),
    totalTickets: 4,
  },
  {
    id: 3,
    name: "Event 3",
    ticketPrice: tokens(3),
    totalTickets: 2,
  },
];

async function main() {
  // Setup account
  const [deployer] = await ethers.getSigners();
  const EventManager = await ethers.getContractFactory("EventManager");
  const eventManager = await EventManager.deploy();
  await eventManager.waitForDeployment();

  for (let i = 0; i < EVENTS.length; i++) {
    const transaction = await eventManager
      .connect(deployer)
      .createEvent(
        EVENTS[i].id,
        EVENTS[i].name,
        EVENTS[i].totalTickets,
        EVENTS[i].ticketPrice
      );

    await transaction.wait();

    console.log(`Created event ${EVENTS[i].id}: ${EVENTS[i].name}`);
  }

  console.log("EventManager deployed to:", await eventManager.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
