import React, { useState, useRef, useEffect } from "react";
import "./ProxonaProfile.css"; // 이 파일에 CSS 스타일을 정의하세요.
import { useNavigate, useLocation } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { ModalWrapper, CloseButton } from "../../pages/styles/DesignSystem";
import Video from "./Video";
import { Stack } from "@mui/material";
import axios from "axios";
import YouTube from "react-youtube";

function ProxonaDetailModal() {
	const navigate = useNavigate();
	const location = useLocation();
	const modalRef = useRef();
	const [videoIds, setVideoIds] = useState(["Zap4EGi88Jo", "u_8MEBiIFYg"]);

	useEffect(() => {
		const observerRefValue = modalRef.current;
		disableBodyScroll(observerRefValue);
		return () => {
			if (observerRefValue) {
				enableBodyScroll(observerRefValue);
			}
		};
	}, []);

	useEffect(() => {
		// try {
		// 	const response = axios.post("/videos", location.state.handleId, {
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 	});
		// 	if (response) {
		// 		setVideoIds(response.video);
		//setVideoIds(["Zap4EGi88Jo", "u_8MEBiIFYg", ...videoIds]);
		// 	}
		// } catch (e) {
		// 	console.log(e);
		// }
	}, []);

	return (
		<ModalWrapper>
			<Stack className="profile-detail-container">
				<CloseButton
					ref={modalRef}
					onClick={() => navigate(location.state.previousLocation.pathname)}
				>
					<i class="bi bi-x-lg"></i>
				</CloseButton>
				<Stack className="header" padding={2}>
					<div className="user-info">
						<div className="user-face">
							<i class="bi bi-emoji-smile"></i>
						</div>
						<div className="user-name">{location.state.username}</div>
					</div>
				</Stack>
				<Stack className="message" padding={1}>
					{location.state.summary}
				</Stack>
				<Stack className="selectors" padding={2}>
					{Object.entries(location.state.tags).map((tag) => {
						return (
							<div className="detail">
								<div className="detail-head">{tag[0]}</div>
								{tag.slice(1).map((element) => {
									return <div className="detail-tags">{element}</div>;
								})}
							</div>
						);
					})}
				</Stack>
				<Stack
					padding={2}
					direction="row"
					spacing={{ xs: 1, sm: 2 }}
					useFlexGap
					flexWrap="wrap"
				>
					{videoIds.map((videoId) => (
						<Video videoId={videoId} />
					))}
				</Stack>
			</Stack>
		</ModalWrapper>
	);
}

export default ProxonaDetailModal;
