import React, { useState, useEffect } from "react";
import { MainButton } from "./styles/DesignSystem";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/index.css";
import { Stack, Box, Button } from "@mui/material";
import { PrimButton } from "./styles/DesignSystem";

const IntroPage = () => {
	const location = useLocation();
	const [info, setInfo] = useState({
		handleId: location.state.handleId,
		channel: "",
		num_videos: "",
		num_comments: "",
	});
	const navigate = useNavigate();
	const port = "http://localhost:8000/persona";

	const loadData = async () => {
		try {
			const response = axios.post(
				port,
				{ id: info.handleId },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response) {
				// setInfo(response);
			}
		} catch (err) {
			console.error("Error fetching new profiles", err);
		}
	};

	useEffect(() => {
		loadData();
	}, [info]);

	return (
		<Stack sx={{ justifyContent: "center" }} className="signup_container">
			<Box sx={{ fontSize: 25 }}>
				{info.channel} 채널 크리에이터님 안녕하세요.
			</Box>
			<Box sx={{ fontSize: 25 }}>
				총 {info.num_videos} 개의 비디오에 담긴 {info.num_comments} 개의 댓글을
				기반으로 <br></br>
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
