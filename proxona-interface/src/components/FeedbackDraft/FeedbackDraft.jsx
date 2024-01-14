import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Stack, Button, Paper, Typography, Divider, Box } from "@mui/material";
import "./FeedbackDraft.css";

export const FeedbackDraft = ({
	channel,
	plot,
	proxonas,
	goToNext,
	goToPrev,
}) => {
	if (!plot || !plot.topic || !plot.draft) {
		goToPrev()
		return
	}

	const {topic, draft} = plot

	return (
		<div className="feedback-draft-container">
			<>
				<Stack marginBottom={"20px"}>
					<h2>{`${channel} 님의 채널 성격에 맞춰 초안을 준비해봤어요.`}</h2>
					<p>{`이제 PROXONA의 피드백을 받아 비디오를 구체적으로 플래닝해봐요. `}</p>
					<Paper
						alignSelf="stretch"
						sx={{
							p: 2,
							display: "flex",
							alignItems: "center",
							m: 1,
							flexDirection: "column",
						}}
					>
						<Box sx={{ p: 2 }}>
							<Typography variant="h4" component="div">
								{topic}
							</Typography>
						</Box>
						<Divider />
						<Box sx={{ p: 2 }}>
							<Typography variant="h6" component="div">
								{draft}
							</Typography>
						</Box>
					</Paper>

					<Stack alignSelf={"flex-end"} flexDirection={"row"}>
						<button className="button-prev" onClick={goToPrev}>
							이전
						</button>
						<button className="button-next" onClick={goToNext}>
							다음
						</button>
					</Stack>
				</Stack>
			</>
		</div>
	);
};
