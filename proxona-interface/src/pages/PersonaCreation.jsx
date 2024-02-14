import React, { useState, useEffect, useRef } from "react";
import { textContent } from "../data/textContent.js";
import ProxonaProfile from "../components/ProxonaProfile/ProxonaProfile.jsx";
import { ChatInterface } from "../components/ChatInterface/ChatInterface.jsx";
// import { dummy } from "../data/dummy.js";
import "./styles/index.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import { avatars } from "../data/avatar.js";
import axios from "axios";
import { port } from "../data/port.js";
import { useDispatch, useSelector } from "react-redux";
// import {
// 	initializePersonaList,
// 	loadPersonas,
// 	addPersona,
// } from "../redux/personaList.js";

function groupBy(array, key) {
	return array.reduce((result, currentItem) => {
		// Get the value of the key for the current item
		const keyValue = currentItem[key];

		// If the key doesn't exist in the result object, initialize it with an empty array
		if (!result[keyValue]) {
			result[keyValue] = [];
		}

		// Add the current item to the array for the key
		result[keyValue].push(currentItem);

		return result;
	}, {}); // Initialize the result as an empty object
}

function PersonaCreation({ proxonas, onCreateProxona }) {
	const [filteredProfile, setFilteredProfile] = useState([]);
	// const personaList = useSelector((state) => state.personaList);
	const [profiles, setProfiles] = useState(proxonas); //should replace
	const [isHovering, setIsHovering] = useState({
		key: "",
		ishover: 0,
	});
	const location = useLocation();
	const [attribute, setAttribute] = useState(null);
	const { id } = useParams();
	// const dispatch = useDispatch();
	// const { personas } = useSelector((state) => state.personaList);
	const proxonaContainerRef = useRef(null);

	useEffect(() => {
		const groupedData = groupBy(profiles, "index");
		// const groupedData = groupBy(personas, "index");
		setFilteredProfile(groupedData);
	}, [profiles]);

	const loadAttr = async () => {
		try {
			await axios
				.get(port + `youtube_api/${id}/get-dim-val-set/`, {
					headers: { "Content-Type": "application/json" },
				})
				.then((response) => {
					setAttribute(response.data);
				});
		} catch (error) {
			console.error("Error submitting form", error);
		}
	};

	const loadProxona = async () => {
		try {
			await axios
				.get(port + `youtube_api/${id}/current-persona/`)
				.then((response) => {
					console.log(response.data);
					setProfiles(response.data);
				});
		} catch (error) {
			console.error("Error loading proxonas", error);
		}
	};

	useEffect(() => {
		loadAttr();
		loadProxona();
	}, []);

	useEffect(() => {
		const scrollToBottom = () => {
			if (proxonaContainerRef.current) {
				proxonaContainerRef.current.scrollTop =
					proxonaContainerRef.current.scrollHeight;
			}
		};
		console.log(proxonaContainerRef);

		scrollToBottom();
	}, [proxonaContainerRef]);

	return (
		<>
			<Stack
				direction="row"
				spacing={40 / 8}
				height={"100%"}
				overflow={"hidden"}
				justifyContent={"center"}
			>
				<Stack direction="row" maxWidth={1440} width={1} py={40 / 8}>
					<Stack
						flex={7}
						paddingRight={"50px"}
						flexShrink={0}
						height={"100%"}
						overflow={"auto"}
					>
						<ChatInterface
							proxonas={proxonas}
							componentProps={{ previousLocation: location }}
						/>
					</Stack>
					<Stack flex={5} flexShrink={0} height={"100%"} overflow={"auto"}>
						<Typography variant="h6">
							{textContent.subTitle} {proxonas.length}
						</Typography>

						<Stack spacing={20 / 8}>
							{proxonas &&
								// Object.entries(filteredProfile).map(([key, items]) => (

								proxonas.map((data, key) => {
									return (
										<Stack
											key={key}
											className={`${key}__persona`}
											onMouseOver={() =>
												setIsHovering({ key: key, ishover: 1 })
											}
											onMouseOut={() => setIsHovering({ key: key, ishover: 0 })}
										>
											<Stack
												flexDirection={"row"}
												gap={10 / 8}
												ref={proxonaContainerRef}
											>
												<ProxonaProfile
													key={key}
													index={data.id}
													username={data.name}
													summary={data.description}
													tags={data.values}
													avatarImg={avatars[data.idx]}
													componentProps={{
														LinkComponent: Link,
														to: data.name,
														state: {
															avatarImg: avatars[data.idx],
															previousLocation: location,
															username: data.name,
															summary: data.description,
															tags: data.values,
															videos: data.videos,
														},
													}}
												/>
												{/* {isHovering.key == key &&
												isHovering.ishover &&
												!data.generated ? (
													<Button
														sx={{ alignSelf: "flex-start" }}
														// LinkComponent={Link}
														// to={"similar/" + key}
														variant="contained"
														disabled
														state={{
															previousLocation: location,
															key: key,
															items: proxonas,
														}}
													>
														{data.name}를 더 잘 알아보고 싶다면?
													</Button>
												) :
													(
													""
												)} */}
											</Stack>
										</Stack>
									);
								})}
							{/* </Stack> */}
							{/* ) */}
							{/* ) */}
							{/* } */}
						</Stack>
					</Stack>
				</Stack>
			</Stack>
			<Stack
				sx={{
					position: "fixed",
					bottom: 0,
					right: 0,
				}}
				spacing={10 / 8}
				mr={8}
				direction={"row"}
			>
				<Button
					LinkComponent={Link}
					to={"discover"}
					state={{ previousLocation: location, attribute: attribute }}
					role="button"
					variant="contained"
					sx={(theme) => ({
						background: "#fff",
						color: theme.palette.primary.main,
					})}
				>
					<Typography sx={{ paddingRight: "8px" }}>
						Discover more proxona
					</Typography>
					<i class="bi bi-compass"></i>
				</Button>
				<Button
					LinkComponent={Link}
					to={`/${id}/feedback`}
					variant="contained"
					sx={{
						marginRight: "80px",
					}}
				>
					<Typography sx={{ paddingRight: "8px" }}>
						Let's get feedback
					</Typography>
					<i class="bi bi-people"></i>
				</Button>
			</Stack>
		</>
	);
}

export default PersonaCreation;
