import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import EventList from "./components/EventList";
import Navbar from "./components/Navbar";

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
        <EventList />
      </ThemeProvider>
    </div>
  );
}

export default App;
