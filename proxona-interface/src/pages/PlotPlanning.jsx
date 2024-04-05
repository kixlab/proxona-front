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
import { useDispatch, useSelector } from "react-redux";

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
	// const [excludedPersona, setExcludedPersona] = useState(() => {
	// 	const saved = localStorage.getItem("excluding_names");
	// 	const initialValue = JSON.parse(saved);
	// 	return initialValue || [];
	// });

	const [excludedPersona, setExcludedPersona] = useState([]);

	const getRemovePersona = async () => {
		try {
			await axios
				.get(port + `youtube_api/${username}/${id}/excluding-persona/`)
				.then((response) => {
					setExcludedPersona(response.data.excluded);
				});
		} catch (error) {
			console.log(error);
		}
	};

	const [messages, setMessages] = useState([]);
	const [botIsLoading, setBotIsLoading] = useState(false);
	const { username, handle } = useSelector((state) => state.loginInfo);
	const navigate = useNavigate();

	const [profiles, setProfiles] = useState(proxonas);

	const createFeedback = async ({ mode, dragged, proxona_name }) => {
		try {
			const response = await axios.post(
				port + `youtube_api/${username}/${id}/plot/${plot.id}/feedback/`,
				{
					mode: mode,
					proxona_name: proxona_name,
					dragged: dragged,
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
	}, [excludedPersona]);

	useEffect(() => {
		getRemovePersona();
	}, []);

	const removePersona = async () => {
		try {
			await axios
				.post(port + `youtube_api/${username}/${id}/excluding-persona/`, {
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
							<b>
								Now, let's plan the video in detail based on feedback from
								audience personas.
							</b>
						</Typography>
						<Stack flexDirection={"row"} justifyContent={"space-between"}>
							<Typography variant="p" sx={{ color: "#D9D9D9" }}>
								Feel free to edit the storyline in the text editor below.{" "}
								<br></br>
								<b>Drag</b> and <b>ask</b> a specific audience persona about the
								parts you'd like feedback on!
							</Typography>
							{profiles.length > 0 && (
								<Stack flexDirection={"row-reverse"} alignItems="center">
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
									<Typography sx={{ color: "#D9D9D9" }}>
										Current participating personas: {profiles.length}
									</Typography>

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
						</Stack>

						<Paper
							sx={{ overflowY: "scroll", flex: 1, bgcolor: "#24292F" }}
							elevation={4}
						>
							<FeedbackBoard
								setMessages={setMessages}
								botIsLoading={botIsLoading}
								setBotIsLoading={setBotIsLoading}
								messages={messages}
								handleId={id}
								plot={plot}
								proxonas={profiles}
								createFeedback={createFeedback}
							/>
						</Paper>
					</Stack>
					<Stack flex={1} p={2}>
						<FeedbackChat
							setMessages={setMessages}
							botIsLoading={botIsLoading}
							setBotIsLoading={setBotIsLoading}
							messages={messages}
							proxonas={proxonas}
							removePersona={removePersona}
						/>
					</Stack>
				</Stack>

				<Stack p={1}>
					<Button
						size="large"
						variant="contained"
						onClick={() => navigate("finish")}
					>
						I'm done!
					</Button>
				</Stack>
			</Stack>
			{/* <Outlet/> */}
		</>
	);
}

export default PlotPlanning;
