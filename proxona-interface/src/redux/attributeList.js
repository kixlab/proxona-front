import { createSlice } from "@reduxjs/toolkit";

//store attribute list state
const attributeListSlice = createSlice({
	name: "attributeList",
	initialState: {
		attributes: [],
	},
	reducers: {
		// load list from a server
		initAttribute: (state, action) => {
			state.attributes = action.payload;
			// console.log("loaded!");
		},

		// add attribute from a server / user input
		addAttribute: (state, action) => {
			state.attributes = [...state.attributes, action.payload];
			// console.log("added!");
		},
	},
});

export const { initAttribute, addAttribute } = attributeListSlice.actions;

export default attributeListSlice.reducer;
