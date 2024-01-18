import React, { useState, useEffect, useCallback } from "react";
import ProxonaProfile from "../components/ProxonaProfile/ProxonaProfile";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Stack, Button, Typography, Box } from "@mui/material";
import { dummy } from "../data/dummy";
import SelectAttributes from "../components/SelectAttributes/SelectAttributes";
import { avatars } from "../data/avatar";
import axios from "axios";
import { port } from "../data/port";
import { useDispatch, useSelector } from "react-redux";
import {
	initializePersonaList,
	addPersona,
	loadPersonas,
} from "../redux/personaList.js";

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

const SelectResult = () => {
	const { id } = useParams();
	const [profiles, setProfiles] = useState([]); //should replace
	const [filteredProfile, setFilteredProfile] = useState([]);
	const [attributes, setAttributes] = useState({});
	const [attribute, setAttribute] = useState({});
	const dispatch = useDispatch();
	const { personas } = useSelector((state) => state.personaList);

	useEffect(() => {
		const groupedData = groupBy(profiles, "id");
		// const groupedData = groupBy(personas, "index");
		setFilteredProfile(groupedData);
	}, [profiles]);

	// const loadData = async () => {
	// 	try {
	// 		await axios
	// 			.post(port + `youtube_api/${id}/create-persona-exp/`)
	// 			.then((response) => {
	// 				setAttribute(response.data);
	// 			});
	// 	} catch (error) {
	// 		console.error("Error submitting form", error);
	// 	}
	// };

	const loadAttr = async () => {
		try {
			await axios
				.get(port + `youtube_api/${id}/get-dim-val-set/`, {
					headers: { "Content-Type": "application/json" },
				})
				.then((response) => {
					setAttributes(response.data);
				});
		} catch (error) {
			console.error("Error submitting form", error);
		}
	};

	const loadProxona = async () => {
		try {
			await axios.get(port + `youtube_api/${id}/proxona/`).then((response) => {
				setProfiles(response.data);
				// console.log(response.data);
				// dispatch(loadPersonas(response.data));
			});
		} catch (error) {
			console.error("Error loading proxonas", error);
		}
	};

	useEffect(() => {
		loadAttr();
		loadProxona();
	}, []);

	return (
		<Box sx={{ padding: "3%" }}>
			<Stack
				sx={{
					height: "100%",
					justifyContent: "center",
					alignItems: "center",
					padding: "2em",
					margin: "auto",
				}}
				spacing={40 / 8}
			>
				<Stack alignItems={"center"}>
					<Typography gutterBottom>
						내 채널의 시청자들에 대해 얼마나 잘 알고 있나요?
					</Typography>
					<Typography variant="h6" gutterBottom>
						내 채널의 대표적인 시청자를 눌러 특성을 확인해보세요.
					</Typography>
				</Stack>
				<Stack direction={"row"} spacing={4}>
					<Stack flex={7}>
						<SelectAttributes
							initValues={attribute}
							attributes={attributes}
							readonly={true}
							extendable={false}
						/>
					</Stack>
					<Stack flex={5} alignItems={"stretch"} spacing={10 / 8}>
						{Object.entries(filteredProfile).map(([key, items]) =>
							items.map((data, idx) => {
								return (
									<ProxonaProfile
										key={idx}
										index={data.id}
										generated={data.generated}
										board={true}
										username={data.name}
										summary={data.description}
										avatarImg={avatars[data.id]}
										componentProps={{
											onClick: () => {
												setAttribute(
													Object.assign(
														{},
														...data.values.map((dv) => ({
															[dv.dimension]: dv.value,
														}))
													)
												);
											},
										}}
									/>
								);
							})
						)}
					</Stack>
				</Stack>
				<Button variant="contained" LinkComponent={Link} to={`/${id}/persona`}>
					다음
				</Button>
			</Stack>
		</Box>
	);
};

export default SelectResult;
