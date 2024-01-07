import React, { useState, useEffect } from "react";
import { MainButton } from "./styles/DesignSystem";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/index.css";
import { Stack, Box, Button, Typography } from "@mui/material";
import { PrimButton } from "./styles/DesignSystem";

const IntroPage = () => {
	const location = useLocation();
	const [info, setInfo] = useState({
		handleId: location.state.handleId,
		channel: "",
		video_count: "",
		comment_count: "",
	});
	const navigate = useNavigate();
	const port = "http://127.0.0.1:8000/"; //should be replaced to hosting address

	const loadData = async () => {
		try {
			await axios
				.get(port + "youtube_api/" + location.state.handleId + "/channel/", {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then((response) => {
					setInfo({
						...info,
						channel: response.data[0].channel_name,
						video_count: response.data[0].video_count,
						comment_count: response.data[0].comment_count,
					});
				});
		} catch (error) {
			console.error("Error submitting form", error);
		}
	};

	useEffect(() => {
		loadData();
	}, [info]);

	return (
		<Stack sx={{ justifyContent: "center" }} className="signup_container">
			<Box sx={{ fontSize: 25 }}>
				{info.channel} 채널 크리에이터님, 안녕하세요.
			</Box>
			<Box sx={{ fontSize: 25 }}>
				총 {info.video_count} 개의 비디오에 담긴 {info.comment_count} 개의
				댓글을 기반으로 <br></br>
				{info.channel} 채널의 시청자들을 추측해보았습니다.
			</Box>
			<Button
				variant="contained"
				sx={{ fontSize: 15, marginTop: 2 }}
				className="more_button"
				onClick={() => navigate(`/${info.handleId}/select`)}
			>
				다음
			</Button>
		</Stack>
	);
};

export default IntroPage;
