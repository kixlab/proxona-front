import React, { useState, useRef, useEffect } from "react";
import { features } from "../../data/dummy";
import "./DiscoverProxona.css";

import { useNavigate, useLocation } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { ModalWrapper } from "../../pages/styles/DesignSystem";
import SelectPersona from "../../pages/SelectPersona";
import { Button, Dialog, DialogActions, DialogContent, Stack } from "@mui/material";
import SelectAttributes from "../SelectAttributes/SelectAttributes";

const DiscoverProxona = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [selectedDimension, setSelectedDimension] = useState(null)
	
	console.log(location);

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

	const handleClose = () => {
		navigate(location.state.previousLocation.pathname)
	}
	
	const handleSelect = (dimension) => {
		setSelectedDimension(dimension)
	}

	const threshold = 2
	const disabled = selectedDimension ? Object.values(selectedDimension).map((values) => values.filter(({selected}) => selected).length === 1).reduce((acc, curr) => acc + curr, 0) < threshold : true


	return (
		<Dialog
			open={true}
			onClose={handleClose}
		>
			{/* <div className="container detailproxona_container"> */}
				<DialogContent>
					{/* <SelectPersona extendable={true}/> */}
					<SelectAttributes 
						extendable={true}
						onSelect={handleSelect}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>닫기</Button>
					<Button 
						variant="contained"
						disabled={disabled}
					>
						{disabled ? `${threshold}개 이상의 특성을 골라주세요` : `프록소나 추가하기`}
					</Button>
				</DialogActions>
				
			{/* </div> */}
		</Dialog>
	);
};

export default DiscoverProxona;
