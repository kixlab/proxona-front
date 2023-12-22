import React, { useState, useEffect } from "react";
import { textContent } from "../data/textContent.js";
import ProxonaProfile from "../components/ProxonaProfile/ProxonaProfile.jsx";
import { ChatInterface } from "../components/ChatInterface/ChatInterface.jsx";
import { dummy } from "../data/dummy.js";
import axios from "axios";
import "./PersonaCreation.css"; // 이 파일에 CSS 스타일을 정의하세요.

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
	const [profiles, setProfiles] = useState(dummy);

	const addSimProfile = async (key) => {
		try {
			const res = await axios.post(
				"http://localhost:8000/persona",
				{ config: "similar", index: key },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (res) {
				setProfiles([...profiles, ...res.data]);
			}
		} catch (err) {
			console.error("Error fetching new profiles", err);
		}
	};

	const addDiffProfile = async (e) => {
		try {
			const res = await axios.post(
				"http://localhost:8000/persona",
				{ config: "diff", index: Object.keys(filteredProfile).length },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (res) {
				setProfiles([...profiles, ...res.data]);
			}
		} catch (err) {
			console.error("Error fetching new profiles", err);
		}
	};

	useEffect(() => {
		const groupedData = groupBy(profiles, "index");
		setFilteredProfile(groupedData);
	}, [profiles]);

	return (
		<div className="container">
			<div className="row">
				<div className="row">
					<div>{textContent.subTitle} (N)</div>
				</div>
				<div className="col">
					{Object.entries(filteredProfile).map(([key, items]) => (
						<div key={key} className={`${key}__persona persona-col`}>
							{items.map((data, idx) => {
								return (
									<div key={idx} className="persona_board ">
										<ProxonaProfile
											username={data.username}
											summary={data.summary}
											tags={data.tags}
										/>
										<button
											className="w-25"
											onClick={(e) => addSimProfile(key)}
											type="button"
										>
											More like this
										</button>
									</div>
								);
							})}
						</div>
					))}
					<button type="button" onClick={addDiffProfile}>
						Add something different
					</button>
				</div>
				<div className="col-6">
					<ChatInterface />
				</div>
			</div>
		</div>
	);
}

export default PersonaCreation;
