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
import { FinishPage } from "./FinishPage.jsx";

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
				Hello,{" "}
				<Typography variant="span" sx={{ color: "#d9c6ff" }}>
					<b>{channel_name}</b>
				</Typography>{" "}
				Channel Creator!
			</Box>
			<Box sx={{ fontSize: 25 }}>
				Based on a total of{" "}
				<Typography variant="span" sx={{ color: "#d9c6ff" }}>
					<b>{video_count}</b>
				</Typography>{" "}
				videos and{" "}
				<Typography variant="span" sx={{ color: "#d9c6ff" }}>
					<b>{comment_count}</b>
				</Typography>{" "}
				comments, <br></br>
				we provide the overview of your channel audience.
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
				Next
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
			<Route path="/finish" element={<FinishPage />}></Route>
		</Routes>
	);
};

export default IntroPage;
