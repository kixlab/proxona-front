import { createSlice } from "@reduxjs/toolkit";

const attributeListSlice = createSlice({
	name: "attributeList",
	initialState: {
		attributes: [],
	},
	reducers: {
		initAttribute: (state, action) => {
			state.attributes = action.payload;
			console.log("loaded!");
		},
		addAttribute: (state, action) => {
			state.attributes = [...state.attributes, action.payload];
			console.log("added!");
		},
	},
});

export const { initAttribute, addAttribute } = attributeListSlice.actions;

export default attributeListSlice.reducer;
