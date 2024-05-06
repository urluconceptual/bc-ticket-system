import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { eventManagerStore } from "./stores/EventManagerStore";

const THEME = createTheme({
  typography: {
    fontFamily: `"Roboto Mono", sans-serif`,
  },
});

function App() {
  useEffect(() => {
    eventManagerStore.loadEvents();
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
