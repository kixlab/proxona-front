import { configureStore } from "@reduxjs/toolkit";
import personaList from "./personaList";
import attributeList from "./attributeList";
import plotHistory from "./plotHistory";

const store = configureStore({
	reducer: {
		personaList: personaList,
		attributeList: attributeList,
		plotHistory: plotHistory,
	},
});

export default store;

//reference: https://www.freecodecamp.org/news/redux-and-redux-toolkit-for-beginners/#:~:text=To%20use%20Redux%20Toolkit%20in,store%20to%20your%20React%20components.
