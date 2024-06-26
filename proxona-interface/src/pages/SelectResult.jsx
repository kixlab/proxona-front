import React, { useState, useEffect, useCallback } from "react";
import ProxonaProfile from "../components/ProxonaProfile/ProxonaProfile";
import {
	Link,
	Route,
	Routes,
	useNavigate,
	useParams,
	useLocation,
} from "react-router-dom";
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
	const location = useLocation();
	const { username, handleId } = useSelector((state) => state.loginInfo);

	const [data, setData] = useState(false);

	useEffect(() => {
		const groupedData = groupBy(profiles, "id");
		// const groupedData = groupBy(personas, "index");
		setFilteredProfile(groupedData);
	}, [profiles]);

	const loadAttr = async () => {
		try {
			await axios
				.get(port + `youtube_api/${username}/${id}/get-dim-val-set/`, {
					headers: { "Content-Type": "application/json" },
				})
				.then((response) => {
					console.log(response);
					setAttributes(response.data);
				});
		} catch (error) {
			console.error("Error submitting form", error);
		}
	};

	const loadProxona = async () => {
		try {
			await axios
				.get(port + `youtube_api/${username}/${id}/current-persona/`)
				.then((response) => {
					setProfiles(response.data);
					dispatch(loadPersonas(response.data));
					if (response.data.length > 0) {
						setData(true);
					}
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
					<Typography variant="h5" gutterBottom>
						How well do you know your channel's viewers?
					</Typography>
					<Typography variant="h4" gutterBottom>
						Click on your channel's typical viewers to check their
						characteristics.
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
						{data ? (
							profiles.map((profile, i) => {
								return (
									<ProxonaProfile
										key={i}
										index={profile.id}
										generated={profile.generated}
										board={true}
										username={profile.name}
										summary={profile.description}
										avatarImg={
											avatars[
												profile.idx
													? profile.idx
													: Math.floor(Math.random() * 11)
											]
										}
										componentProps={{
											onClick: () => {
												setAttribute(
													Object.assign(
														{},
														...profile.values.map((dv) => ({
															[dv.dimension_name]: dv.name,
														}))
													)
												);
											},
										}}
									/>
								);
							})
						) : (
							<div>no data loaded</div>
						)}
					</Stack>
				</Stack>
				<Button variant="contained" LinkComponent={Link} to={`/${id}/persona`}>
					Next
				</Button>
			</Stack>
		</Box>
	);
};

export default SelectResult;
