import React from "react";
// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import PersonaCreation from "./pages/PersonaCreation.jsx";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { createTheme } from "@mui/material";
import { darkTheme } from "./pages/styles/Themes.jsx";

function App() {
	// const darkTheme = createTheme({
    //     palette: {
	// 		mode: 'dark',
	// 		primary: {
	// 		  main: '#6d53d3',
	// 		},
	// 		secondary: {
	// 		  main: '#f50057',
	// 		},
	// 	  },
    //   });

	return (
		<>
			<Outlet />
			{/* <ThemeProvider theme={darkTheme}> */}
				<PersonaCreation></PersonaCreation>
			{/* </ThemeProvider> */}
			
		</>
	);
}

export default App;
