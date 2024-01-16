import { createSlice } from "@reduxjs/toolkit";
import { dummy } from "../data/dummy";

const personaListSlice = createSlice({
	name: "personaList", //state name
	initialState: {
		personas: dummy,
	},
	reducers: {
		initializePersonaList: (state) => {
			state.personas = dummy;
		},
		loadPersonas: (state) => {
			state.personas = state.personas;
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
