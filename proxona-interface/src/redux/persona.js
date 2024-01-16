import { createSlice } from "@reduxjs/toolkit";

const personaSlice = createSlice({
	name: "persona",
	initialState: {
		index: null,
		username: null,
		summary: null,
		generated: false,
		tags: [],
		avatarImg: null,
	},

	reducers: {
		setName: (state, action) => {
			state.username = action.payload.username;
		},
		setAvatarImg: (state, action) => {
			state.avatarImg = action.payload.avatarImg;
		},
		setSummary: (state, action) => {
			state.summary = action.payload.summary;
		},
		setGenerated: (state, action) => {
			state.generated = action.payload.generated;
		},
		setTags: (state, action) => {
			state.tags = action.payload.tags;
		},
		initializePersona: (state, action) => {
			state.username = null;
			state.summary = null;
			state.generated = false;
			state.tags = [];
			state.avatarImg = null;
		},
	},
});

export const { setName, setSummarize, setGenerated, setAttributes } =
	personaSlice.actions;

export default personaSlice.reducer;
