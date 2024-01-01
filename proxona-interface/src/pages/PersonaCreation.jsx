import React, { useState, useEffect } from "react";
import { textContent } from "../data/textContent.js";
import ProxonaProfile from "../components/ProxonaProfile/ProxonaProfile.jsx";
import { ChatInterface } from "../components/ChatInterface/ChatInterface.jsx";
import { dummy } from "../data/dummy.js";
import axios from "axios";
import "./styles/index.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

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
	const [profiles, setProfiles] = useState(dummy); //should replace
	const [isHovering, setIsHovering] = useState({
		key: "",
		ishover: 0,
	});
	const location = useLocation();
	const { id } = useParams();

	useEffect(() => {
		const groupedData = groupBy(profiles, "index");
		setFilteredProfile(groupedData);
	}, [profiles]);

	return (
		<>
			<Stack direction="row" spacing={40/8} height={'100%'} overflow={'hidden'}>
				<Stack flex={7} flexShrink={0} height={'100%'} overflow={'auto'}>
					<ChatInterface />
				</Stack>
				<Stack flex={5} flexShrink={0} height={'100%'} overflow={'auto'}>
					<Typography variant="h6">{textContent.subTitle} {profiles.length}</Typography>

					<Stack spacing={20 / 8}>
						{Object.entries(filteredProfile).map(([key, items]) => (
							
								<Stack
									key={key}
									className={`${key}__persona`}
									flexDirection={"row"}
									onMouseOver={() => setIsHovering({ key: key, ishover: 1 })}
									onMouseOut={() => setIsHovering({ key: key, hover: 0 })}
								>
									{items.map((data, idx) => {
										return (
											<ProxonaProfile
												key={idx}
												index={data.index}
												generated={data.generated}
												username={data.username}
												summary={data.summary}
												tags={data.tags}
											/>
										);
									})}
									{isHovering.key == key && isHovering.ishover ? (
										<Button LinkComponent={Link}
											to={"similar/" + key}
											variant="outlined"
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
						))}
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
					state={{ previousLocation: location }}
					role="button"
					variant="contained"
					sx={(theme) => ({
						background: '#fff',
						color: theme.palette.primary.main
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
