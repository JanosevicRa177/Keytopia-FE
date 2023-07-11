import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { theme as glassTheme } from "@saas-ui/theme-glass";
import "@fontsource/dosis";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

export const theme = extendTheme({
	fonts: {
		heading: `'Dosis', sans-serif`,
		body: `'Dosis', sans-serif`,
	},
	glassTheme,
});

root.render(
	<ChakraProvider theme={theme}>
		<App />
	</ChakraProvider>
);
reportWebVitals();
