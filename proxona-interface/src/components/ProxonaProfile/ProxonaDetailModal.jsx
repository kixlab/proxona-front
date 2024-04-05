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
		console.log("experience", location.state.experience);
		const outputArray = location.state.tags.reduce((acc, curr) => {
			const existingItem = acc.find((item) => {
				return item.dimension_name === curr.dimension_name;
			});
			if (existingItem) {
				existingItem.name_kor.push(curr.name_kor);
			} else {
				acc.push({
					name_kor: [curr.name_kor],
					dimension_name: curr.dimension_name,
				});
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
					Job: {location.state.job} <br></br>
					Who am {location.state.username}?: {location.state.summary}
				</Stack>
				<Divider></Divider>
				<Stack className="selectors" padding={1}>
					<Typography padding={1} sx={{ fontWeight: "600" }}>
						<Box component="div" sx={{ pr: 1, display: "inline" }}>
							<i class="bi bi-chat-right-dots-fill"></i>
						</Box>
						Here are some characteristics {location.state.username} has!
					</Typography>
					<Stack padding={1}>
						{dv.map(({ dimension_name, name_kor }) => {
							return (
								<div className="detail">
									<Chip className="detail-head" label={dimension_name}></Chip>
									{name_kor.map((tag) => {
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
				{location.state.experience ? (
					<>
						<Divider></Divider>
						<Typography padding={1} sx={{ fontWeight: "600" }}>
							<Box component="div" sx={{ pr: 1, display: "inline" }}>
								<i class="bi bi-chat-right-dots-fill"></i>
							</Box>
							Recent experience of {location.state.username}
							<Stack padding={1}>
								<li>{location.state.experience}</li>
							</Stack>
							{/* {location.state.experience.map((exp) => {
								return (
									<Stack padding={1}>
										<li>{exp}</li>
									</Stack>
								);
							})} */}
						</Typography>
					</>
				) : null}
				<Divider></Divider>
				<Typography padding={1} sx={{ fontWeight: "600" }}>
					<Box component="div" sx={{ pr: 1, display: "inline" }}>
						<i class="bi bi-chat-right-dots-fill"></i>
					</Box>
					Why does {location.state.username} watch this channel?
				</Typography>
				<Stack padding={1}>{location.state.reason}</Stack>
				<Divider></Divider>
				{location.state.videos.length > 0 && (
					<>
						<Typography padding={1} sx={{ fontWeight: "600" }}>
							<Box component="div" sx={{ pr: 1, display: "inline" }}>
								<i class="bi bi-chat-right-dots-fill"></i>
							</Box>
							Videos {location.state.username} often watches in this channel
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
