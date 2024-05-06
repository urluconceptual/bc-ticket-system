const hre = require("hardhat");
const ethers = hre.ethers;

const tokens = (n) => {
  return hre.ethers.parseUnits(n.toString(), 'ether');
}

async function main() {
  // Setup account
  const [deployer] = await ethers.getSigners();
  const EventManager = await ethers.getContractFactory("EventManager");
  const eventManager = await EventManager.deploy();
  await eventManager.waitForDeployment();

  console.log("EventManager deployed to:", await eventManager.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});