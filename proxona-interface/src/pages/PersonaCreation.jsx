import React, { useState, useEffect } from "react";
import { textContent } from "../data/textContent.js";
import ProxonaProfile from "../components/ProxonaProfile/ProxonaProfile.jsx";
import { ChatInterface } from "../components/ChatInterface/ChatInterface.jsx";
import { dummy } from "../data/dummy.js";
import axios from "axios";
import "./index.css"; // 이 파일에 CSS 스타일을 정의하세요.
import FooterButton from "../components/FooterButton/FooterButton.jsx";

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

	useEffect(() => {
		const groupedData = groupBy(profiles, "index");
		setFilteredProfile(groupedData);
	}, [profiles]);

	return (
		<div className="container pt-4">
			<div className="row">
				<div className="col-7">
					<ChatInterface />
				</div>
				<div className="col-5">
					<div className="row">
						<h4>
							{textContent.subTitle} {profiles.length}
						</h4>
					</div>
					<div className="vh-100 persona_wrapper">
						<div className="persona_container">
							{Object.entries(filteredProfile).map(([key, items]) => (
								<div
									className="persona-col"
									onMouseOver={() => setIsHovering({ key: key, ishover: 1 })}
									onMouseOut={() => setIsHovering({ key: key, hover: 0 })}
								>
									<div
										key={key}
										className={`${key}__persona persona_board  min-vw-100`}
									>
										{items.map((data, idx) => {
											return (
												<ProxonaProfile
													key={idx}
													generated={data.generated}
													username={data.username}
													summary={data.summary}
													tags={data.tags}
												/>
											);
										})}
										{isHovering.key == key && isHovering.ishover ? (
											<button
												className="more_button btn btn-outline-secondary"
												onClick={(e) => addSimProfile(key)}
												type="button"
											>
												Add similar one
												<i class="bi bi-plus"></i>
											</button>
										) : (
											""
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<div
				style={{
					position: "fixed",
					bottom: 0,
					right: 0,
				}}
			>
				<FooterButton></FooterButton>
				<button className="btn btn-primary" style={{ marginRight: "80px" }}>
					Let's get feedback
				</button>
			</div>
		</div>
	);
}

export default PersonaCreation;
