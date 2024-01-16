import { createSlice } from "@reduxjs/toolkit";

//store channel info state
const channelInfoSlice = createSlice({
	name: "channelInfo",
	initialState: {
		channel_name: null,
		comment_count: null,
		video_count: null,
		channel_handle: null,
	},
	reducers: {
		setChannel: (state, action) => {
			state.channel_name = action.payload.channel_name;
			state.comment_count = action.payload.comment_count;
			state.video_count = action.payload.video_count;
			state.channel_handle = action.payload.channel_handle;
		},
	},
});

export const { setChannel } = channelInfoSlice.actions;

export default channelInfoSlice.reducer;
