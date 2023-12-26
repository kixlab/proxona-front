import React from "react";

const FooterButton = () => {
	// const addDiffProfile = async (e) => {
	// 	try {
	// 		const res = await axios.post(
	// 			"http://localhost:8000/persona",
	// 			{ config: "diff", index: Object.keys(filteredProfile).length },
	// 			{
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 			}
	// 		);
	// 		if (res) {
	// 			setProfiles([...profiles, ...res.data]);
	// 		}
	// 	} catch (err) {
	// 		console.error("Error fetching new profiles", err);
	// 	}
	// };

	return (
		<button className="btn btn-primary" style={{ marginRight: "10px" }}>
			Discover more proxona
		</button>
	);
};

export default FooterButton;
