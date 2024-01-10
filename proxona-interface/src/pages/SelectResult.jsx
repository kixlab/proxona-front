import React, { useState, useEffect, useCallback } from "react";
import ProxonaProfile from "../components/ProxonaProfile/ProxonaProfile";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Stack, Button, Typography } from "@mui/material";
import { dummy } from "../data/dummy";
import SelectAttributes from "../components/SelectAttributes/SelectAttributes";
import { avatars } from "../data/avatar";
import axios from "axios";
import { port } from "../data/port";

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
	const [profiles, setProfiles] = useState(dummy); //should replace
	const [filteredProfile, setFilteredProfile] = useState([]);
	const [attribute, setAttribute] = useState(null);

	useEffect(() => {
		const groupedData = groupBy(profiles, "index");
		setFilteredProfile(groupedData);
	}, [profiles]);

	// const loadData = async () => {
	// 	try {
	// 		await axios
	// 			.get(port + `youtube_api/${id}/get-dim-val-set/`, {
	// 				headers: { "Content-Type": "application/json" },
	// 			})
	// 			.then((response) => {
	// 				setAttribute(response.data);
	// 			});
	// 	} catch (error) {
	// 		console.error("Error submitting form", error);
	// 	}
	// };

	// useEffect(() => {
	// 	loadData();
	// }, []);

	return (
		<Stack
			sx={{
				height: "100%",
				justifyContent: "center",
				alignItems: "center",
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
				<SelectAttributes
					initValues={attribute}
					readonly={true}
					extendable={false}
				/>
				<Stack alignItems={"stretch"} spacing={10 / 8}>
					{Object.entries(filteredProfile).map(([key, items]) =>
						items.map((data, idx) => {
							return (
								<ProxonaProfile
									key={idx}
									index={data.index}
									generated={data.generated}
									board={true}
									username={data.username}
									summary={data.summary}
									avatarImg={avatars[data.index]}
									componentProps={{
										onClick: () => {
											setAttribute(data.tags);
										},
									}}
									// tags={data.tags}
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
	);
};

export default SelectResult;
