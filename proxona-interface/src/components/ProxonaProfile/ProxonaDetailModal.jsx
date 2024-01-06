import React, { useState, useRef, useEffect } from "react";
import "./ProxonaProfile.css"; // 이 파일에 CSS 스타일을 정의하세요.
import { useNavigate, useLocation } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { ModalWrapper, CloseButton } from "../../pages/styles/DesignSystem";
import Video from "./Video";
import { Dialog, Stack, IconButton, Avatar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import YouTube from "react-youtube";

function ProxonaDetailModal() {
	const navigate = useNavigate();
	const location = useLocation();
	console.log(location)

	const [videoIds, setVideoIds] = useState(["Zap4EGi88Jo", "u_8MEBiIFYg"]);

	const handleClose = () => {
		navigate(location.state.previousLocation.pathname)
	}

	return (
		<Dialog
		open={true}
		onClose={handleClose}
		>
			<IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
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
						<Avatar variant="square" src={`/static/img/animal/${location.state.avatarImg}.png`}/>
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
		</Dialog>
	);
}

export default ProxonaDetailModal;
