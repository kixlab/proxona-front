import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {
	Stack,
	Button,
	Paper,
	Typography,
	Divider,
	Box,
	CircularProgress,
} from "@mui/material";
import "./FeedbackDraft.css";

export const FeedbackDraft = ({
	channel,
	plot,
	proxonas,
	goToNext,
	goToRegenerate,
	isLoading,
	// goToPrev,
}) => {
	// if (!plot || !plot.topic || !plot.draft) {
	// 	goToPrev();
	// 	return;
	// }

	const { topic, draft } = plot;
	console.log(isLoading);

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
							{draft && !isLoading ? (
								<Typography
									variant="h6"
									component="div"
									whiteSpace={"pre-line"}
								>
									{draft}
								</Typography>
							) : (
								<CircularProgress />
							)}
						</Box>
					</Paper>

					<Stack alignSelf={"flex-end"} flexDirection={"row"}>
						{/* <Button
							className="button-prev"
							disabled={isLoading}
							onClick={goToRegenerate}
						>
							{isLoading ? "생성 중입니다.." : "다시 생성"}
						</Button> */}
						<Button
							className="button-next"
							disabled={isLoading}
							onClick={goToNext}
						>
							다음
						</Button>
					</Stack>
				</Stack>
			</>
		</div>
	);
};
