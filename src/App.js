import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import PageContent from "./components/PageContent";
import { eventManagerStore } from "./stores/EventManagerStore";

const THEME = createTheme({
  typography: {
    fontFamily: `"Roboto Mono", sans-serif`,
  },
});

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={THEME}>
        <Navbar />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <PageContent />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
