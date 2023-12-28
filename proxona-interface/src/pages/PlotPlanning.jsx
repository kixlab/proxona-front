import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Stack } from "@mui/material";
import FeedbackBoard from "../components/FeedbackBoard/FeedbackBoard";
import { ChatInterface } from "../components/ChatInterface/ChatInterface";

// export default PlotPlanning;

// import React from "react";
// import { Route, Routes, useNavigate, useParams } from "react-router-dom";
// import { Stack } from "@mui/material";
// import { FeedbackBoard } from "../components/FeedbackBoard/FeedbackBoard";
// import { ChatInterface } from "../components/ChatInterface/ChatInterface";
// import "./PlotPlanning.css";


function PlotPlanning() {
    const {plotId} = useParams();
    console.log(plotId);
    return (
        // <Stack direction="row" sx={{ width: '100%', height: '100%' }}>
        //     <FeedbackBoard sx={{ flex: 2 }} />
        //     <ChatInterface sx={{ flex: 1 }} />
        // </Stack>
        <div className="plotPlanning-container">
        <div className="feedbackBoard">
            <FeedbackBoard />
        </div>
        <div className="chatInterface">
            <ChatInterface />
        </div>
    </div>
    );
}

export default PlotPlanning;
