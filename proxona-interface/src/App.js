import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import PersonaCreation from "./pages/PersonaCreation.jsx";
import { Outlet, useParams } from "react-router-dom";
import axios from "axios";
import { port } from "./data/port.js";

function App() {
	const { id } = useParams();
	const [proxonas, setProxonas] = useState([]);

	const loadProxona = async () => {
		try {
			await axios.get(port + `youtube_api/${id}/proxona/`).then((response) => {
				setProxonas(response.data);
			});
		} catch (error) {
			console.error("Error loading proxonas", error);
		}
	};

	useEffect(() => {
		loadProxona();
	}, [proxonas]);

	const onCreateProxona = (newProxona) => {
		setProxonas([...proxonas, newProxona]);
	};

	return (
		<>
			<Outlet
				context={{
					proxonas,
					onCreateProxona,
				}}
			/>
			<PersonaCreation proxonas={proxonas} onCreateProxona={onCreateProxona} />
		</>
	);
}

export default App;
