import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
	Paper,
	Stack,
	ThemeProvider,
	Typography,
	createTheme,
	Button,
} from "@mui/material";
import FeedbackBoard from "../components/FeedbackBoard/FeedbackBoard";
import { FeedbackChat } from "../components/FeedbackChat/FeedbackChat";
import { port } from "../data/port";
import { useDispatch, useSelector } from "react-redux";

function PlotPlanning({ plot, proxonas }) {
	// const { plotId } = useParams();
	const { id } = useParams();
	const [feedbackForm, setFeedbackForm] = useState(null);
	const [feedbackHistory, setFeedbackHistory] = useState([]);
	const dispatch = useDispatch();

	const createFeedback = async ({mode, proxona_id, highlighted}) => {
        try {
            const response = await axios
                .post(port + `youtube_api/${id}/plot/${plot.id}/feedback/`, {
                    mode,
                    proxona: proxona_id,
                    plot: plot.id,
                    highlighted,
                });
            setFeedbackHistory([...feedbackHistory, response.data]);
            return response
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
