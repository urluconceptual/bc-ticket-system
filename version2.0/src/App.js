import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./components/Navigation";
import Section from "./components/Section";
import Ticket from "./components/Ticket";

// ABIs
import Tickets from "./abis/Tickets.json";

// Config
import config from "./config.json";

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [ticketsContract, setTicketsContract] = useState(null);
  const [cinemaTickets, setCinemaTickets] = useState(null);
  const [theatreTickets, setTheatreTickets] = useState(null);
  const [ticket, setTicket] = useState({});
  const [toggle, setToggle] = useState(false);

  const loadBlockchainData = async () => {
    // Connect to blockchain
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();
    console.log(network);

    // Connect to smart contract
    const ticketsContract = new ethers.Contract(
      config[network.chainId].tickets.address,
      Tickets,
      provider
    );
    setTicketsContract(ticketsContract);
    console.log("Tickets contract: ", ticketsContract);

    // Load tickets
    const ticketsList = [];
    for (let i = 0; i < 10; i++) {
      const ticket = await ticketsContract.tickets(i + 1);
      ticketsList.push(ticket);
    }

    // Filter tickets
    const cinemaTickets = ticketsList.filter((ticket) => ticket.category === "cinema");
    setCinemaTickets(cinemaTickets);

    const theatreTickets = ticketsList.filter((ticket) => ticket.category === "theatre");
    setTheatreTickets(theatreTickets);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const togglePop = (ticket) => {
    setTicket(ticket);
    setToggle(!toggle);
  };

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />

      <h2>Tickets</h2>
      {cinemaTickets && theatreTickets && (
        <>
          <Section title={"Cinema tickets"} items={cinemaTickets} togglePop={togglePop} />
          <Section title={"Theatre tickets"} items={theatreTickets} togglePop={togglePop} />
        </>
      )}

      {toggle && (
        <Ticket ticket={ticket} provider={provider} account={account} ticketsContract={ticketsContract} togglePop={togglePop} />
      )}
    </div>
  );
}

export default App;
