import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Stack, Button, Paper, InputBase } from "@mui/material";
import "./FeedbackIntro.css";

export const FeedbackIntro = ({ topic, setTopic, goToNext, isLoading }) => {
	return (
		<div className="feedback-intro-container">
			<>
				<Stack alignItems={"stretch"} marginBottom={"20px"}>
					<h2>어떤 주제에 대한 비디오를 기획해볼까요?</h2>
					<p>비디오 주제를 입력하면 채널 성격에 맞는 초안을 준비해드릴게요.</p>

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
						onClick={topic && !isLoading ? goToNext : ""}
						disabled={!topic | isLoading ? true : false}
						className="button-next"
					>
						{isLoading ? `초안을 작성중입니다...` : `다음`}
					</Button>
				</Stack>
			</>
		</div>
	);
};
