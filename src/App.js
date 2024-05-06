import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import EventManager from "./abis/EventManager.json";
import "./App.css";
import Navbar from "./components/Navbar";
import config from "./config.json";

const THEME = createTheme({
  typography: {
    fontFamily: `"Roboto Mono", sans-serif`,
  },
});

function App() {
  const [provider, setProvider] = useState(null);
  const [eventManager, setEventManager] = useState(null);

  const loadData = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();
    const eventManager = new ethers.Contract(
      config[network.chainId].eventManager.address,
      EventManager,
      provider
    );

    const events = await eventManager.getEvents();
    console.log(events);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={THEME}>
        <Navbar />
        <header className="App-header">Welcome to dappevents!</header>
      </ThemeProvider>
    </div>
  );
}

export default App;
