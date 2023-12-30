import React, { useState, useEffect } from "react";
import { MainButton } from "./styles/DesignSystem";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/index.css";

const IntroPage = () => {
	const location = useLocation();
	const [info, setInfo] = useState({
		handleId: location.state.handleId,
		channel: "",
		num_videos: "",
		num_comments: "",
	});
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
		<div className="container signup_container">
			<p>{info.channel} 채널 크리에이터님 안녕하세요.</p>
			<p>
				총 {info.num_videos} 개의 비디오에 담긴 {info.num_comments} 개의 댓글을
				기반으로
				{info.channel} 채널의 시청자들을 추측해보았습니다.
			</p>

			<Link
				to={`/${info.handleId}/persona`}
				role="button"
				className="btn btn-secondary btn-lg"
			>
				다음
			</Link>
		</div>
	);
};

export default IntroPage;
