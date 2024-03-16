import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { port } from "../data/port";
import { useSelector } from "react-redux";
import ProxonaProfile from "../components/ProxonaProfile/ProxonaProfile";
import {
	Paper,
	Stack,
	Typography,
	Button,
	Container,
	Divider,
} from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { avatars } from "../data/avatar";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const SelectFeedbackPersona = ({ proxonas }) => {
	const { id } = useParams();
	const [targetPersona, setTargetPersona] = useState(() => {
		const saved = localStorage.getItem("excluding_names");
		if (saved) {
			const initialValue = JSON.parse(saved);
			return initialValue;
		} else {
			return [];
		}
	});
	// const [targetPersona, setTargetPersona] = useState([]);

	const [profiles, setProfiles] = useState([]);
	const location = useLocation();
	const [inputText, setInputText] = useState("");
	const [activateTextArea, setActivateTextArea] = useState(() => {
		const m = proxonas.map((proxona) => {
			return {
				name: proxona.name,
				activate: false,
				description: proxona.description,
			};
		});
		return m;
	});

	const { username, handle } = useSelector((state) => state.loginInfo);

	const removePersona = async () => {
		try {
			await axios
				.post(port + `youtube_api/${username}/${id}/excluding-persona/`, {
					excluding_names: targetPersona,
				})
				.then((response) => {
					setProfiles(response.data);
				});
		} catch (error) {
			console.error("Error loading proxonas", error);
		}
	};

	const getRemovePersona = async () => {
		try {
			await axios
				.get(port + `youtube_api/${username}/${id}/excluding-persona/`)
				.then((response) => {
					setTargetPersona(response.data);
				});
		} catch (error) {
			console.log(error);
		}
	};

	const reviseSummary = async () => {
		try {
			await axios
				.post(port + `youtube_api/${username}/${id}/updating-persona/`, {
					proxona_name: activateTextArea.filter((x) => x.activate === true)[0]
						.name,
					updating_description: activateTextArea.filter(
						(x) => x.activate === true
					)[0].description,
				})
				.then((response) => {
					setActivateTextArea(
						activateTextArea.map((x) => ({
							...x,
							activate: false,
						}))
					);

					setProfiles(
						profiles.map((x) => {
							if (x.name === response.data.name) {
								return {
									...x,
									description: response.data.description,
								};
							} else {
								return x;
							}
						})
					);
				});
		} catch (error) {
			console.error("Error loading proxonas", error);
		}
	};

	useEffect(() => {
		setProfiles(proxonas);
		if (proxonas.length > 0) {
			const m = proxonas.map((proxona) => {
				return {
					name: proxona.name,
					activate: false,
					description: proxona.description,
				};
			});

			setActivateTextArea(m);
		}
	}, [proxonas]);

	useEffect(() => {
		if (targetPersona.length > 0) {
			removePersona();
			localStorage.setItem("excluding_names", JSON.stringify(targetPersona));
		}
	}, [targetPersona]);

	// useEffect(() => {
	// 	getRemovePersona();
	// }, []);

	return (
		<Container>
			<Stack spacing={40 / 8} sx={{ m: "5rem" }}>
				<Stack sx={{ textAlign: "center" }}>
					<Typography variant="h4" mb={2}>
						<b>어떤 시청자 페르소나와 기획을 해볼까요?</b>
					</Typography>
					<Typography variant="p" sx={{ color: "#D9D9D9" }}>
						이제부터, 새로운 비디오 스토리라인을 작성하는 시간입니다. <br></br>
						어떤 시청자 페르소나에 집중해서 비디오를 기획하고 싶나요? <br></br>
						덜 중요하다고 생각되는 시청자 페르소나는 제외하셔도 좋습니다. (
						<DeleteIcon /> 클릭) <br></br>또한, 시청자 페르소나의 프로필을 수정
						및 구체화하실 수 있습니다. <br></br>아이콘을 눌러 프로필을
						수정해보세요. (
						<EditIcon /> 클릭, 수정 후 <SaveIcon /> 클릭)
					</Typography>
				</Stack>
				<Divider></Divider>
				<Stack flexDirection={"row"} gap={10 / 8} flexWrap={"wrap"}>
					{!targetPersona.length > 0 && profiles
						? profiles.map((proxona) => (
								<Stack
									key={proxona.name}
									flex
									alignItems="flex-end"
									direction="column"
								>
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
										sx={{ color: "#808080" }}
										onClick={() =>
											setTargetPersona([proxona.name, ...targetPersona])
										}
									>
										<DeleteIcon />
									</Button>
								</Stack>
						  ))
						: profiles.map((proxona) => (
								<div key={proxona.name}>
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
					{/* <div>
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
							onClick={() => setTargetPersona([proxona.name, ...targetPersona])}
						>
							기획에서 빼기
						</Button>
					</div> */}
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
