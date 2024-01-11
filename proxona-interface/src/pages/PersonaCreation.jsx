import React, { useState, useEffect } from "react";
import { textContent } from "../data/textContent.js";
import ProxonaProfile from "../components/ProxonaProfile/ProxonaProfile.jsx";
import { ChatInterface } from "../components/ChatInterface/ChatInterface.jsx";
import { dummy } from "../data/dummy.js";
import "./styles/index.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import { avatars } from "../data/avatar.js";
import axios from "axios";
import { port } from "../data/port.js";

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

function PersonaCreation() {
	const [filteredProfile, setFilteredProfile] = useState([]);
	// const personaList = useSelector((state) => state.personaList);
	const [profiles, setProfiles] = useState(dummy); //should replace
	const [isHovering, setIsHovering] = useState({
		key: "",
		ishover: 0,
	});
	const [newPersona, setNewPersona] = useState([]);
	const location = useLocation();
	const [attribute, setAttribute] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		const groupedData = groupBy(profiles, "index");

		setFilteredProfile(groupedData);
	}, [profiles]);

	const loadAtt = async () => {
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

	useEffect(() => {
		loadAtt();
	}, []);

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
					<Stack flex={7} flexShrink={0} height={"100%"} overflow={"auto"}>
						<ChatInterface />
					</Stack>
					<Stack flex={5} flexShrink={0} height={"100%"} overflow={"auto"}>
						<Typography variant="h6">
							{textContent.subTitle} {profiles.length}
						</Typography>

						<Stack spacing={20 / 8}>
							{filteredProfile &&
								Object.entries(filteredProfile).map(([key, items]) => (
									<Stack
										key={key}
										className={`${key}__persona`}
										onMouseOver={() => setIsHovering({ key: key, ishover: 1 })}
										onMouseOut={() => setIsHovering({ key: key, ishover: 0 })}
									>
										{items.map((data, idx) => {
											return (
												<Stack
													ml={data.generated ? 2 : 0}
													flexDirection={"row"}
													gap={10 / 8}
												>
													<ProxonaProfile
														key={idx}
														index={data.index}
														username={data.username}
														summary={data.summary}
														tags={data.tags}
														avatarImg={avatars[data.index]}
														componentProps={{
															LinkComponent: Link,
															to: data.username,
															state: {
																avatarImg: avatars[data.index],
																previousLocation: location,
																username: data.username,
																summary: data.summary,
																tags: data.tags,
															},
														}}
													/>
													{isHovering.key == key &&
													isHovering.ishover &&
													!data.generated ? (
														<Button
															sx={{ alignSelf: "flex-start" }}
															LinkComponent={Link}
															to={"similar/" + key}
															variant="contained"
															state={{
																previousLocation: location,
																key: key,
																items: items,
															}}
														>
															Add similar one
															<i class="bi bi-plus"></i>
														</Button>
													) : (
														""
													)}
												</Stack>
											);
										})}
									</Stack>
								))}
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
					Discover more proxona
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
					Let's get feedback
					<i class="bi bi-people"></i>
				</Button>
			</Stack>
		</>
	);
}

export default PersonaCreation;
