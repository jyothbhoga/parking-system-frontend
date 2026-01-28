import Routes from "./components/Routes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import darkTheme from "./theme";
import Toast from "./common/components/Toast";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes />
      <Toast />
    </ThemeProvider>
  );
}

export default App;
