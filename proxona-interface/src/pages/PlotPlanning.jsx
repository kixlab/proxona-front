import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
	Paper,
	Stack,
	Avatar,
	ThemeProvider,
	Typography,
	createTheme,
	Button,
	IconButton,
	MenuItem,
	Menu,
} from "@mui/material";
import FeedbackBoard from "../components/FeedbackBoard/FeedbackBoard";
import { FeedbackChat } from "../components/FeedbackChat/FeedbackChat";
import { port } from "../data/port";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { avatars } from "../data/avatar";
import { Outlet } from "@mui/icons-material";

function PlotPlanning({ plot, proxonas }) {
	// const { plotId } = useParams();
	const { id } = useParams();
	const [feedbackForm, setFeedbackForm] = useState(null);
	const [feedbackHistory, setFeedbackHistory] = useState([]);
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);
	const [excludedPersona, setExcludedPersona] = useState(() => {
		const saved = localStorage.getItem("excluding_names");
		const initialValue = JSON.parse(saved);
		return initialValue || [];
	});

	const [profiles, setProfiles] = useState(proxonas);

	const createFeedback = async ({ mode, proxona_id, highlighted }) => {
		try {
			const response = await axios.post(
				port + `youtube_api/${id}/plot/${plot.id}/feedback/`,
				{
					mode,
					proxona: proxona_id,
					plot: plot.id,
					highlighted,
				}
			);

			setFeedbackHistory([...feedbackHistory, response.data]);
			return response;
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (excludedPersona.length > 0) {
			removePersona();
		}
	}, []);

	const removePersona = async () => {
		try {
			await axios
				.post(port + `youtube_api/${id}/excluding-persona/`, {
					excluding_names: excludedPersona,
				})
				.then((response) => {
					setProfiles(response.data);
				});
		} catch (error) {
			console.error("Error loading proxonas", error);
		}
	};

	return (
		<>
			<Stack height={1}>
				<Stack direction="row" sx={{ width: "100%", height: "100%" }} flex={1}>
					<Stack flex={2} p={2} spacing={10 / 8} height={1}>
						<Typography variant="h5">
							이제 PROXONA의 피드백을 받아 비디오를 구체적으로 기획해봅시다.
						</Typography>
						<Typography>
							아래 텍스트 에디터 속 내용을 자유롭게 편집하고, PROXONA의 피드백을
							받아보세요.{" "}
						</Typography>
						{profiles.length > 0 && (
							<Stack flexDirection={"row"} alignItems="center">
								<Typography>
									현재 함께 참여하고 있는 Proxona: {profiles.length}
								</Typography>
								<IconButton
									onClick={handleClick}
									aria-label="more"
									id="long-button"
									aria-controls={open ? "long-menu" : undefined}
									aria-expanded={open ? "true" : undefined}
									aria-haspopup="true"
								>
									<MoreVertIcon />
								</IconButton>
								<Menu
									id="long-menu"
									MenuListProps={{
										"aria-labelledby": "long-button",
									}}
									anchorEl={anchorEl}
									open={open}
									onClose={handleClose}
									PaperProps={{
										style: {
											maxHeight: 100 * 4.5,
											width: "70ch",
										},
									}}
								>
									{profiles.map((proxona, key) => (
										<MenuItem onClick={handleClose}>
											<Avatar
												sx={{ width: 24, height: 24, marginRight: "10px" }}
												variant="square"
												src={`/static/img/animal/${avatars[proxona.idx]}.png`}
											/>
											{proxona.name} : {proxona.description}
										</MenuItem>
									))}
								</Menu>
							</Stack>
						)}

						<Paper
							sx={{ overflowY: "scroll", flex: 1, bgcolor: "#24292F" }}
							elevation={4}
						>
							<FeedbackBoard
								plot={plot}
								proxonas={profiles}
								createFeedback={createFeedback}
							/>
						</Paper>
					</Stack>
					<Stack flex={1} p={2}>
						<FeedbackChat proxonas={proxonas} removePersona={removePersona} />
					</Stack>
				</Stack>

				<Stack p={1}>
					<Button size="large" variant="contained">
						플래닝 완료
					</Button>
				</Stack>
			</Stack>
			{/* <Outlet/> */}
		</>
	);
}

export default PlotPlanning;
