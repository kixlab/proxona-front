import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Stack } from "@mui/material";
import FeedbackBoard from "../components/FeedbackBoard/FeedbackBoard";
import { FeedbackChat } from "../components/FeedbackChat/FeedbackChat";


function PlotPlanning() {
    const {plotId} = useParams();
    console.log(plotId);
    return (
        <Stack direction="row" sx={{ width: '100%', height: '100%' }}>
            <Stack flex={2}>
                <FeedbackBoard/>
            </Stack>
            <Stack flex={1}>
                <FeedbackChat/>
            </Stack>
        </Stack>
    );
}

export default PlotPlanning;
