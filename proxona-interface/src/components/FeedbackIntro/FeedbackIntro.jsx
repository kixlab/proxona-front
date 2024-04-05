import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Stack, Button, Paper, InputBase, Typography } from "@mui/material";
import "./FeedbackIntro.css";

export const FeedbackIntro = ({ topic, setTopic, goToNext, isLoading }) => {
	return (
		<div className="feedback-intro-container">
			<>
				<Stack alignItems={"stretch"} marginBottom={"20px"}>
					<Typography
						variant="h4"
						mb={2}
						sx={{ color: "#6d53d3", marginBottom: "10px" }}
					>
						<b>
							Let's brainstorm ideas for a new video with your audience
							personas!
						</b>
					</Typography>
					<Typography
						variant="p"
						sx={{ color: "#808080", marginBottom: "30px" }}
					>
						Please write down the video topic and storyline below.
					</Typography>

					<Paper
						alignSelf="stretch"
						sx={{ p: 2, display: "flex", alignItems: "center", m: 1 }}
					>
						<InputBase
							id="outlined-controlled"
							label="비디오 주제"
							placeholder="비디오 주제를 적어보세요"
							fullWidth
							value={topic}
							multiline
							rows={10}
							disabled={isLoading}
							onChange={(event) => {
								setTopic(event.target.value);
							}}
						/>
					</Paper>

					<Button
						style={{
							alignSelf: "flex-end",
						}}
						onClick={topic && !isLoading ? goToNext : null}
						disabled={!topic | isLoading ? true : false}
						className="button-next"
					>
						{isLoading ? `초안을 작성중입니다...` : `Next`}
					</Button>
				</Stack>
			</>
		</div>
	);
};
