import { createSlice } from "@reduxjs/toolkit";

const loginInfoSlice = createSlice({
	name: "loginInfo",
	initialState: {
		username: null,
		handle: null,
	},
	reducers: {
		setLoginInfo: (state, action) => {
			state.username = action.payload.username;
			state.handle = action.payload.handle;
			console.log("store data");
		},
	},
});

export const { setLoginInfo } = loginInfoSlice.actions;

export default loginInfoSlice.reducer;
