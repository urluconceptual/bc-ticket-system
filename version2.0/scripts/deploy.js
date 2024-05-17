const hre = require("hardhat");
const ethers = hre.ethers;
const { tickets: ticketsData } = require("../src/tickets.json");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  // setup accounts
  const [deployer] = await ethers.getSigners();
  //console.log("Deployer: \n", deployer)

  // deploy tickets contract
  const Tickets = await hre.ethers.getContractFactory("Tickets");
  const tickets = await Tickets.deploy();
  await tickets.deployed();
  console.log(`Deployed Tickets Contract at: ${tickets.address}\n`);

  // list items
  for (let i = 0; i < ticketsData.length; i++) {
    const transaction = await tickets.connect(deployer).list(
      ticketsData[i].id, 
      ticketsData[i].name,
      ticketsData[i].category,
      tokens(ticketsData[i].price),
      ticketsData[i].stock   
    )

    await transaction.wait()

    console.log(`Listed ticket ${ticketsData[i].id}: ${ticketsData[i].name}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
