import React, { useState, useRef, useEffect } from "react";
import "./ProxonaProfile.css"; // 이 파일에 CSS 스타일을 정의하세요.
import { useNavigate, useLocation } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { ModalWrapper, CloseButton } from "../../pages/styles/DesignSystem";
import Video from "./Video";
import { Dialog, Stack, IconButton, Avatar, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function ProxonaDetailModal() {
	const navigate = useNavigate();
	const location = useLocation();

	// const [videoIds, setVideoIds] = useState(["Zap4EGi88Jo", "u_8MEBiIFYg"]);

	console.log(location.state);

	const handleClose = () => {
		navigate(location.state.previousLocation.pathname);
	};

	return (
		<Dialog open={true} onClose={handleClose}>
			<IconButton
				aria-label="close"
				onClick={handleClose}
				sx={{
					position: "absolute",
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
			>
				<CloseIcon />
			</IconButton>
			<Stack className="profile-detail-container">
				<Stack className="header" padding={2}>
					<div className="user-info">
						<Avatar
							variant="square"
							src={`/static/img/animal/${location.state.avatarImg}.png`}
						/>
						<div className="user-name">{location.state.username}</div>
					</div>
				</Stack>
				<Stack className="message" padding={1}>
					{location.state.summary}
				</Stack>
				<Stack className="selectors" padding={2}>
					{location.state.tags.map((tag) => {
						return (
							<div className="detail">
								<div className="detail-head">{tag["dimension_name"]}</div>
								<div className="detail-tags">{tag["name"]}</div>
							</div>
						);
					})}
				</Stack>
				<Typography paragraph>
					<i class="bi bi-chat-right-dots-fill"></i>
					{location.state.username} 가 자주 보는 비디오
				</Typography>

				<Stack
					padding={2}
					direction="row"
					spacing={{ xs: 1, sm: 2 }}
					useFlexGap
					flexWrap="wrap"
				>
					{location.state.videos.map(({ origin_id, title }) => (
						<Video videoId={origin_id} />
					))}
				</Stack>
			</Stack>
		</Dialog>
	);
}

export default ProxonaDetailModal;
