import { createSlice } from "@reduxjs/toolkit";

const plotHistorySlice = createSlice({
	name: "plotHistory",
	initialState: {
		topic: null,
		mode: [],
		draft: [],
		proxona: [],
	},
	reducers: {
		initializePlot: (state) => {
			state.topic = null;
			state.mode = [];
			state.draft = [];
			state.proxona = [];
		},
		setTopic: (state, action) => {
			state.topic = action.payload.topic;
		},
		setMode: (state, action) => {
			state.mode = action.payload.mode;
		},
		setProxona: (state, action) => {
			state.proxona = action.payload.proxona;
		},
	},
});

export const { setTopic, setMode, setProxona } = plotHistorySlice.actions;
export default plotHistorySlice.reducer;
