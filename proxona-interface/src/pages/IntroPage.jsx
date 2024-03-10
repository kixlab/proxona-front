import React, { useState, useEffect, useMemo } from "react";
import { MainButton } from "./styles/DesignSystem";
import {
	Route,
	Routes,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";
import axios from "axios";
import "./styles/index.css";
import { port } from "../data/port.js";
import { Stack, Box, Button, Typography } from "@mui/material";
import { PrimButton } from "./styles/DesignSystem";
import SelectPersona from "./SelectPersona.jsx";
import SelectResult from "./SelectResult.jsx";
import App from "../App.js";
import ProxonaDetailModal from "../components/ProxonaProfile/ProxonaDetailModal.jsx";
import DiscoverProxona from "../components/DiscoverProxonaModal/DiscoverProxona.jsx";
import SimilarPersona from "../components/SimilarPersonaModal/SimilarPersona.jsx";
import Feedback from "./Feedback.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setChannel } from "../redux/channelInfo.js";

const IntroIndex = () => {
	// const location = useLocation();
	const { id } = useParams();
	// const [info, setInfo] = useState({
	// 	handleId: id,
	// 	channel: "",
	// 	video_count: "",
	// 	comment_count: "",
	// });
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { channel_name, video_count, comment_count, channel_handle } =
		useSelector((state) => state.channelInfo);
	const location = useLocation();
	const { username, handle } = useSelector((state) => state.loginInfo);

	const loadData = async () => {
		try {
			await axios
				.get(port + `youtube_api/${username}/` + handle + "/channel/", {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then((response) => {
					dispatch(setChannel(response.data[0]));
					// setInfo({
					// 	...info,
					// 	channel: response.data[0].channel_name,
					// 	video_count: response.data[0].video_count,
					// 	comment_count: response.data[0].comment_count,
					// });
				});
		} catch (error) {
			console.error("Error submitting form", error);
		}
	};

	useEffect(() => {
		loadData();
	}, [id]);

	return (
		<Stack sx={{ justifyContent: "center" }} className="signup_container">
			<Box sx={{ fontSize: 25 }}>
				{channel_name} 채널 크리에이터님, 안녕하세요.
			</Box>
			<Box sx={{ fontSize: 25 }}>
				총 {video_count} 개의 비디오에 담긴 {comment_count} 개의 댓글을 기반으로{" "}
				<br></br>
				{channel_name} 채널의 시청자들을 추측해보았습니다.
			</Box>
			<Button
				variant="contained"
				sx={{ fontSize: 15, marginTop: 2 }}
				className="more_button"
				onClick={() =>
					navigate(`/${channel_handle}/select`, {
						state: {
							handleId: channel_handle,
							username: location.state.username,
						},
					})
				}
			>
				다음
			</Button>
		</Stack>
	);
};

const IntroPage = () => {
	// const { id } = useParams();
	// const [plot, setPlot] = useState(null);
	// const [plotLoading, setPlotLoading] = useState(true);

	// const navigate = useNavigate();

	// const loadPlot = async () => {
	// 	try {
	// 		const response = await axios.get(`${port}youtube_api/${id}/plot/`);

	// 		// console.log(response);
	// 		if (response.data !== "" && response.data.completed) {
	// 			// TODO: !response.data.completed
	// 			setPlot(response.data);
	// 			setPlotLoading(false);
	// 			navigate(`/${id}/feedback/editor/${id}`);
	// 			console.log("Plot is loaded successfully");
	// 		}
	// 	} catch (error) {
	// 		console.error("Error loading plot", error);
	// 	}
	// };

	// useEffect(() => {
	// 	if (plotLoading) {
	// 		loadPlot();
	// 	}
	// }, [plotLoading]);

	return (
		<Routes>
			<Route path="/" element={<IntroIndex />} />
			<Route path="/select" element={<SelectPersona />} />
			<Route path="/result" element={<SelectResult />} />
			<Route path="/persona/" element={<App />}>
				<Route path=":persona" element={<ProxonaDetailModal />} />
				<Route path="discover" element={<DiscoverProxona />} />
				<Route path="similar/:id" element={<SimilarPersona />} />
			</Route>
			<Route path="/feedback/*" element={<Feedback />}></Route>
		</Routes>
	);
};

export default IntroPage;
