import React from "react";
import YouTube from "react-youtube";

const Video = ({ videoId }) => {
	const opts = {
		height: "100",
		width: "200",
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 0,
		},
	};

	const _onReady = (e) => {
		// access to player in all event handlers via event.target
		e.target.pauseVideo();
	};
	console.log(videoId);

	return <YouTube videoId={videoId} opts={opts} onReady={_onReady} />;
};

export default Video;
