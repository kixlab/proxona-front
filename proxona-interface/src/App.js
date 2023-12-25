import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import PersonaCreation from "./pages/PersonaCreation.jsx";
import { Outlet } from "react-router-dom";

function App() {

	

	return (
		<div>
			<Outlet />
			<PersonaCreation></PersonaCreation>
		</div>
	);
}

export default App;
