import { createSlice } from "@reduxjs/toolkit";
import { dummy } from "../data/dummy";

const personaListSlice = createSlice({
	name: "personaList", //state name
	initialState: {
		personas: [],
	},
	reducers: {
		initializePersonaList: (state) => {
			state.personas = dummy;
		},
		loadPersonas: (state, action) => {
			state.personas = action.playload;
			console.log("loaded");
		},
		addPersona: (state, action) => {
			state.personas = [...state.personas, action.payload];
		},
		removePersona: (state, action) => {
			state.personas = state.personas.filter(
				(persona) => persona.id !== action.payload
			);
		},
	},
});

export const {
	addPersona,
	removePersona,
	initializePersonaList,
	loadPersonas,
} = personaListSlice.actions;

export default personaListSlice.reducer;
