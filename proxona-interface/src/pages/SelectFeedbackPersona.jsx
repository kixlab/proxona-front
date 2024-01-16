import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProxonaProfile from "../components/ProxonaProfile/ProxonaProfile";
import { Paper, Stack, Typography, Button } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";

const SelectFeedbackPersona = () => {
	return (
		<Stack>
			<Typography>이제 프록소나와 비디오를 기획해볼까요?</Typography>
			<ProxonaProfile revisable={true}></ProxonaProfile>
			<Button LinkComponent={Link} to={"/topic"}>
				다음
			</Button>
		</Stack>
	);
};

export default SelectFeedbackPersona;
