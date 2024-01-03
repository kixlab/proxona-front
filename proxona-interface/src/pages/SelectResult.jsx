import React, { useState, useEffect, useCallback } from "react";
import ProxonaProfile from "../components/ProxonaProfile/ProxonaProfile";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Stack, Button, Box } from "@mui/material";
import { dummy } from "../data/dummy";

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

	useEffect(() => {
		const groupedData = groupBy(profiles, "index");
		setFilteredProfile(groupedData);
	}, [profiles]);

	return (
		<div>
			내 채널의 비디오는 각각 어떤 프록소나로부터 반응을 얻었을까요?
			{Object.entries(filteredProfile).map(([key, items]) => (
				<Stack key={key}>
					{items.map((data, idx) => {
						return (
							<ProxonaProfile
								key={idx}
								index={data.index}
								generated={data.generated}
								board={true}
								username={data.username}
								summary={data.summary}
								tags={data.tags}
							/>
						);
					})}
				</Stack>
			))}
			<Button LinkComponent={Link} to={`/${id}/persona`}>
				다음
			</Button>
		</div>
	);
};

export default SelectResult;
