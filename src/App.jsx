import { CssBaseline, ThemeProvider } from "@mui/material";
import Toast from "./common/components/Toast";
import Routes from "./components/Routes";
import darkTheme from "./theme";

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
