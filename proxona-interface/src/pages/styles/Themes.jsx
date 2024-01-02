import { createTheme } from "@mui/material";

export const lightTheme = {
	body: "#FFF",
	text: "#363537",
	toggleBorder: "#FFF",
	background: "#363537",
};
export const darkTheme = createTheme({
	  palette: {
		mode: 'dark',
		primary: {
		  main: '#6d53d3',
		},
		secondary: {
		  main: '#f50057',
		},
		background: {
		  default: '#171a1e',
		  paper: '#24292f',
		},
	  },
});