
import React, { useEffect, useState } from "react";
// import { ChatInterface } from "../components/ChatInterface/ChatInterface";
// import { FeedbackBoard } from "../components/FeedbackBoard/FeedbackBoard";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Stack } from "@mui/material";
import { FeedbackBoard } from "../components/FeedbackBoard/FeedbackBoard";
import { ChatInterface } from "../components/ChatInterface/ChatInterface";

function PlotPlanning() {
    const {plotId} = useParams()
    console.log(plotId)
	return (
		<Stack direction={'row'}>
            <FeedbackBoard/>
            <ChatInterface/>
        </Stack>
	);
}

export default PlotPlanning;
