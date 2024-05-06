import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

const THEME = createTheme({
  typography: {
    fontFamily: `"Roboto Mono", sans-serif`,
  },
});

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [eventManager, setEventManager] = useState(null);

  const loadData = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();
    //const eventManager = new ethers.Contract(config[network.chainId].dappazon.address, provider)
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={THEME}>
        <Navbar account={account} setAccount={setAccount}></Navbar>
        <header className="App-header">Welcome to dappevents!</header>
      </ThemeProvider>
    </div>
  );
}

export default App;
