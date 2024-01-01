import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Stack } from "@mui/material";
import FeedbackBoard from "../components/FeedbackBoard/FeedbackBoard";
import { FeedbackChat } from "../components/FeedbackChat/FeedbackChat";

function PlotPlanning() {
	const { plotId } = useParams();
	console.log(plotId);
	return (
		<Stack direction="row" sx={{ width: "100%", height: "100%" }}>
			<Stack flex={2}>
				<h2 className="title">
					이제 PROXONA의 피드백을 받아 비디오를 구체적으로 기획해봅시다.
				</h2>
				<div>
					아래 Text Editor 를 자유롭게 편집하고, PROXONA의 피드백을 받아보세요.{" "}
				</div>
				<FeedbackBoard />
			</Stack>
			<Stack flex={1}>
				<FeedbackChat />
			</Stack>
		</Stack>
	);
}

export default PlotPlanning;
