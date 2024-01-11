import { createSlice } from "@reduxjs/toolkit";
import { dummy } from "../data/dummy";

const personaListSlice = createSlice({
	name: "personaList",
	initialState: {
		personas: dummy,
	},
	reducers: {
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

export const { addPersona, removePersona } = personaListSlice.actions;

export default personaListSlice.reducer;
