import { createSlice } from "@reduxjs/toolkit";
import { dummy } from "../data/dummy";

function groupBy(array, key) {
	return array.reduce((result, currentItem) => {
		// Get the value of the key for the current item
		const keyValue = currentItem[key];

		// If the key doesn't exist in the result object, initialize it with an empty array
		if (!result[keyValue]) {
			result[keyValue] = [];
		}

		// Add the current item to the array for the key
		result[keyValue].push(currentItem);

		return result;
	}, {}); // Initialize the result as an empty object
}

const personaListSlice = createSlice({
	name: "personaList", //state name
	initialState: {
		personas: [],
	},
	reducers: {
		dummyPersonaList: (state) => {
			state.personas = dummy;
		},
		initializePersonaList: (state) => {
			state.personas = [];
		},
		loadPersonas: (state, action) => {
			// const groupedData = groupBy(action.playload, "id");
			state.personas = action.payload;
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
	dummyPersonaList,
	addPersona,
	removePersona,
	initializePersonaList,
	loadPersonas,
} = personaListSlice.actions;

export default personaListSlice.reducer;
