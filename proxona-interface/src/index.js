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
import { store } from "./redux/store";
import ProxonaDetailModal from "./components/ProxonaProfile/ProxonaDetailModal";
import DiscoverProxona from "./components/DiscoverProxonaModal/DiscoverProxona";
import SimilarPersona from "./components/SimilarPersonaModal/SimilarPersona";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Signup />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/persona/:id",
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
		path: "/feedback/:id/*",
		element: <Feedback />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
