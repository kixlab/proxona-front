import { createSlice } from "@reduxjs/toolkit";

const plotHistorySlice = createSlice({
	name: "plotHistory",
	initialState: {
		topic: "",
		original: "",
		history: [],
	},
	reducers: {
		setTopic: (state, action) => {
			state.topic = action.payload;
		},
		setOriginal: (state, action) => {
			state.original = action.payload;
		},
		addToHistory: (state, action) => {
			state.history.push(action.payload);
		},
	},
});

export const { setTopic, setOriginal, addToHistory } = plotHistorySlice.actions;
export default plotHistorySlice.reducer;
