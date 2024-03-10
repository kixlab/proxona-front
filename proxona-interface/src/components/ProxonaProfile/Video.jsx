import React from "react";
// import YouTube from "react-youtube";
import ReactPlayer from "react-player/lazy";

const Video = ({ videoId }) => {
	// const opts = {
	// 	height: "200",
	// 	width: "400",
	// 	playerVars: {
	// 		origin: 1,
	// 		// https://developers.google.com/youtube/player_parameters
	// 		autoplay: 0,
	// 	},
	// };

	// const _onReady = (e) => {
	// 	// access to player in all event handlers via event.target
	// 	e.target.pauseVideo();
	// };
	return (
		<ReactPlayer
			width="400px"
			height="200px"
			url={`http://youtube.com/watch?v=${videoId}`}
			config={{
				youtube: {
					playerVars: {
						widget_referrer: "http://localhost:3000/", //need to change
					},
				},
			}}
		/>
	);
};

export default Video;
