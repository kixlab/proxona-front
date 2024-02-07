import React from "react";
import YouTube from "react-youtube";

const Video = ({ videoId }) => {
	const opts = {
		height: "200",
		width: "400",
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 0,
		},
	};

	const _onReady = (e) => {
		// access to player in all event handlers via event.target
		e.target.pauseVideo();
	};
	// console.log(videoId);

	return <YouTube videoId={videoId} opts={opts} onReady={_onReady} />;
};

export default Video;
