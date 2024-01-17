import React, { useState } from "react";
import axios from "axios";
import { port } from "../data/port";
import { Dialog, DialogContent, TextField, DialogActions } from "@mui/material";
import { useSelector } from "react-redux";
import ProxonaProfile from "../components/ProxonaProfile/ProxonaProfile";
import { Paper, Stack, Typography, Button } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";

const ReviseValueDialog = ({ dimension, open, handleClose, handleAdd }) => {
	const [value, setValue] = useState("");
	const { id } = useParams();

	const addNewAtt = async () => {
		try {
			await axios.post(port + `youtube_api/${id}/add-new-value/`, {
				dimension: dimension,
				value,
			});

			handleAdd(dimension, value);
			setValue("");
		} catch (error) {
			console.error("Error submitting form", error);
		}
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogContent p={2}>
				<Typography gutterBottom>
					<b style={{ textDecoration: "underline" }}>{dimension}</b>에 추가할
					특성을 적어보세요.
				</Typography>
				<TextField
					value={value}
					onChange={(event) => {
						setValue(event.target.value);
					}}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>닫기</Button>
				<Button
					variant="contained"
					disabled={value.length === 0}
					onClick={() => {
						addNewAtt();
						handleClose();
					}}
				>
					추가하기
				</Button>
			</DialogActions>
		</Dialog>
	);
};

const SelectFeedbackPersona = () => {
	const { personaList } = useSelector((state) => state.personaList);

	// const handleClose = () => {
	// 	navigate(location.state.previousLocation.pathname);
	// };

	return (
		<Stack spacing={40 / 8}>
			<Typography>어떤 프록소나와 기획을 해볼까요?</Typography>
			{personaList.map((persona) => (
				<ProxonaProfile
					username={persona.username}
					summary={persona.summary}
					generated={persona.generated}
					tags={persona.tags}
					avatarImg={persona.avatarImg}
					revisable={true}
				></ProxonaProfile>
			))}
			<Button to={"/topic"}>다음</Button>
			<ReviseValueDialog
			// open={addValueDialogOpen}
			// dimension={targetDimension}
			// handleClose={handleAddValueDialogClose}
			// handleAdd={addValues}
			/>
		</Stack>
	);
};

export default SelectFeedbackPersona;
