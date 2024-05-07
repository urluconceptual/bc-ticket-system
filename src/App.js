import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import Navbar from "./components/Navbar";
import PageContent from "./components/PageContent";

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
        <PageContent />
      </ThemeProvider>
    </div>
  );
}

export default App;
