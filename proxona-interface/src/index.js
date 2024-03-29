import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Signup from "./pages/Signup";
import Feedback from "./pages/Feedback";
import ErrorPage from "./pages/ErrorPage";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { GlobalStyles } from "./pages/styles/GlobalStyles";
import { lightTheme, darkTheme } from "./pages/styles/Themes";
import IntroPage from "./pages/IntroPage";
import { CssBaseline } from "@mui/material";
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Signup />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/:id/*",
		element: <IntroPage />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ThemeProvider theme={darkTheme}>
			<>
				<CssBaseline />
				<GlobalStyles></GlobalStyles>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<RouterProvider router={router} />
					</PersistGate>
				</Provider>
			</>
		</ThemeProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
