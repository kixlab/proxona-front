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

	const createFeedback = async ({ mode, proxona_id, highlighted }) => {
		console.log({ mode, proxona_id, plot, highlighted });
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
			setFeedbackHistory([...feedbackHistory, response.data.body]);
			return response;
		} catch (err) {
			console.log(err);
		}
	};

	// useEffect(() => {
	// 	createFeedback();
	// }, [feedbackForm]);

	return (
		<Stack height={1}>
			<Stack direction="row" sx={{ width: "100%", height: "100%" }} flex={1}>
				<Stack flex={2} p={2} spacing={10 / 8} height={1}>
					<Typography variant="h6">
						이제 PROXONA의 피드백을 받아 비디오를 구체적으로 기획해봅시다.
					</Typography>
					<Typography>
						아래 Text Editor 를 자유롭게 편집하고, PROXONA의 피드백을
						받아보세요.{" "}
					</Typography>

					{proxonas.length > 0 && (
						<Stack flexDirection={"row"}>
							현재 함께 참여하고 있는 Proxona: {proxonas.length}
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
								{proxonas.map((proxona) => (
									<MenuItem onClick={handleClose}>
										<Avatar
											sx={{ width: 24, height: 24, marginRight: "10px" }}
											variant="square"
											src={`/static/img/animal/${avatars[proxona.id]}.png`}
										/>
										{proxona.name} : {proxona.description}
									</MenuItem>
								))}
							</Menu>
						</Stack>
					)}

					<Paper sx={{ flex: 1, bgcolor: "#24292F" }} elevation={4}>
						<FeedbackBoard
							plot={plot}
							proxonas={proxonas}
							createFeedback={createFeedback}
						/>
					</Paper>
				</Stack>
				<Stack flex={1} p={2}>
					<FeedbackChat />
				</Stack>
			</Stack>

			<Stack p={1}>
				<Button size="large" variant="contained">
					플래닝 완료
				</Button>
			</Stack>
		</Stack>
	);
}

export default PlotPlanning;
