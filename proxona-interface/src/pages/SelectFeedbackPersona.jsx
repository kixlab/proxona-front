import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { port } from "../data/port";
import { Dialog, DialogContent, TextField, DialogActions } from "@mui/material";
import { useSelector } from "react-redux";
import ProxonaProfile from "../components/ProxonaProfile/ProxonaProfile";
import { Paper, Stack, Typography, Button, Container } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { avatars } from "../data/avatar";

const SelectFeedbackPersona = ({ proxonas }) => {
	const { id } = useParams();
	const [targetPersona, setTargetPersona] = useState(() => {
		const saved = localStorage.getItem("excluding_names");
		const initialValue = JSON.parse(saved);
		return initialValue || [];
	});

	const [profiles, setProfiles] = useState(proxonas);
	const [activateTextArea, setActivateTextArea] = useState({ null: false });
	const [inSave, setInSave] = useState(false);
	const [inputText, setInputText] = useState("");

	const removePersona = async () => {
		try {
			await axios
				.post(port + `youtube_api/${id}/excluding-persona/`, {
					excluding_names: targetPersona,
				})
				.then((response) => {
					console.log(response);
					setProfiles(response.data);
				});
		} catch (error) {
			console.error("Error loading proxonas", error);
		}
	};

	const reviseSummary = async () => {
		try {
			await axios
				.post(port + `youtube_api/${id}/updating-persona/`, {
					proxona_name: Object.keys(activateTextArea)[0],
					updating_description: inputText,
				})
				.then((response) => {
					console.log(response.data);
					// setProfiles(response.data);
				});
		} catch (error) {
			console.error("Error loading proxonas", error);
		}
	};

	useEffect(() => {
		if (targetPersona.length > 0) {
			removePersona();
			localStorage.setItem("excluding_names", JSON.stringify(targetPersona));
		}
	}, [targetPersona]);

	return (
		<Container>
			<Stack spacing={40 / 8} sx={{ m: "5rem" }}>
				<Typography variant="h4">어떤 프록소나와 기획을 해볼까요?</Typography>
				<Typography variant="h5">
					기획에 참여하지 않는 프록소나는 하단에 '기획에서 빼기' 를 눌러주세요
				</Typography>

				<Stack flexDirection={"row"} gap={10 / 8} flexWrap={"wrap"}>
					{profiles.map((proxona, key) => (
						<div>
							<ProxonaProfile
								username={proxona.name}
								summary={proxona.description}
								generated={proxona.generated}
								tags={proxona.values}
								avatarImg={avatars[proxona.idx]}
								revisable={true}
								reviseSummary={reviseSummary}
								activateTextArea={activateTextArea}
								setActivateTextArea={setActivateTextArea}
								setInputText={setInputText}
								inputText={inputText}
							></ProxonaProfile>
							<Button
								sx={{ color: "white" }}
								onClick={() =>
									setTargetPersona([proxona.name, ...targetPersona])
								}
							>
								기획에서 빼기
							</Button>
						</div>
					))}
				</Stack>
				<Button
					variant="contained"
					to={`/${id}/feedback/topic`}
					LinkComponent={Link}
				>
					다음
				</Button>
			</Stack>
		</Container>
	);
};

export default SelectFeedbackPersona;
