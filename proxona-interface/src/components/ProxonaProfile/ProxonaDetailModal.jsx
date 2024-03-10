import React, { useState, useRef, useEffect } from "react";
import "./ProxonaProfile.css"; // 이 파일에 CSS 스타일을 정의하세요.
import { useNavigate, useLocation } from "react-router-dom";
import Video from "./Video";
import {
	Dialog,
	Chip,
	Stack,
	IconButton,
	Avatar,
	Typography,
	Divider,
	Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function ProxonaDetailModal() {
	const navigate = useNavigate();
	const location = useLocation();
	const [dv, setDv] = useState([]);

	const handleClose = () => {
		navigate(location.state.previousLocation.pathname);
	};

	useEffect(() => {
		const outputArray = location.state.tags.reduce((acc, curr) => {
			const existingItem = acc.find((item) => {
				return item.dimension_name === curr.dimension_name;
			});
			if (existingItem) {
				existingItem.name.push(curr.name);
			} else {
				acc.push({ name: [curr.name], dimension_name: curr.dimension_name });
			}
			return acc;
		}, []);

		setDv(outputArray);
	}, []);

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
						<Box component="div" sx={{ pr: 2, display: "inline" }}></Box>
						<div className="user-name">{location.state.username}</div>
						{location.state.generated ? (
							<Chip
								sx={{ ml: 2, mt: 1, bgcolor: "#e1e1e7", color: "#111" }}
								size="small"
								label={"customized by creator"}
							/>
						) : (
							<div></div>
						)}
					</div>
				</Stack>
				<Divider></Divider>
				<Stack className="message" padding={1}>
					직업: {location.state.job} <br></br>
					자기 소개: {location.state.summary}
				</Stack>
				<Divider></Divider>
				<Stack className="selectors" padding={1}>
					<Typography padding={1} sx={{ fontWeight: "600" }}>
						<Box component="div" sx={{ pr: 1, display: "inline" }}>
							<i class="bi bi-chat-right-dots-fill"></i>
						</Box>
						이런 특성을 가지고 있어요!
					</Typography>
					<Stack padding={1}>
						{dv.map(({ dimension_name, name }) => {
							return (
								<div className="detail">
									<Chip className="detail-head" label={dimension_name}></Chip>
									{name.map((tag) => {
										return (
											<Chip
												className="detail-body"
												color="primary"
												label={tag}
											></Chip>
										);
									})}
								</div>
							);
						})}
					</Stack>
				</Stack>
				<Divider></Divider>
				<Typography padding={1} sx={{ fontWeight: "600" }}>
					<Box component="div" sx={{ pr: 1, display: "inline" }}>
						<i class="bi bi-chat-right-dots-fill"></i>
					</Box>
					{location.state.username} 는 왜 이 채널을 시청할까요?
				</Typography>
				<Stack padding={1}>{location.state.reason}</Stack>
				<Divider></Divider>
				{location.state.videos.length > 0 && (
					<>
						<Typography padding={1} sx={{ fontWeight: "600" }}>
							<Box component="div" sx={{ pr: 1, display: "inline" }}>
								<i class="bi bi-chat-right-dots-fill"></i>
							</Box>
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
					</>
				)}
			</Stack>
		</Dialog>
	);
}

export default ProxonaDetailModal;
