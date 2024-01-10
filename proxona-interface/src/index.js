import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Signup from "./pages/Signup";
import Feedback from "./pages/Feedback";
import ErrorPage from "./pages/ErrorPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import ProxonaDetailModal from "./components/ProxonaProfile/ProxonaDetailModal";
import DiscoverProxona from "./components/DiscoverProxonaModal/DiscoverProxona";
import SimilarPersona from "./components/SimilarPersonaModal/SimilarPersona";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { GlobalStyles } from "./pages/styles/GlobalStyles";
import { lightTheme, darkTheme } from "./pages/styles/Themes";
import IntroPage from "./pages/IntroPage";
import { CssBaseline } from "@mui/material";
import SelectPersona from "./pages/SelectPersona";
import SelectResult from "./pages/SelectResult";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Signup />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/:id",
		element: <IntroPage />,
	},
	{
		path: "/:id/select",
		element: <SelectPersona />,
	},
	{
		path: "/:id/result",
		element: <SelectResult />,
	},

	{
		path: ":id/persona/",
		element: <App />,
		children: [
			{
				path: ":persona",
				element: <ProxonaDetailModal />,
			},
			{
				path: "discover",
				element: <DiscoverProxona />,
			},
			{
				path: "similar/:id",
				element: <SimilarPersona />,
			},
		],
	},
	{
		path: ":id/feedback/*",
		element: <Feedback />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ThemeProvider theme={darkTheme}>
			<>
				<CssBaseline />
				<GlobalStyles></GlobalStyles>
				{/* <Provider store={store}> */}
				<RouterProvider router={router} />
				{/* </Provider> */}
			</>
		</ThemeProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
