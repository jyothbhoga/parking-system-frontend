import Routes from "./components/Routes";
import { CssBaseline,  ThemeProvider } from "@mui/material";
import darkTheme from "./theme";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <Routes />
    </ThemeProvider>
  );
}

export default App;
