import React, { useState, useRef, useEffect, useCallback } from "react";
import "./DiscoverProxona.css";
import axios from "axios";
import { port } from "../../data/port";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import SelectAttributes from "../SelectAttributes/SelectAttributes";

const DiscoverProxona = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { id } = useParams();

	const [selectedDimension, setSelectedDimension] = useState(null);
	const [selectedDimensionTrue, setSelectedDimensionTrue] = useState([]);

	const handleClose = () => {
		navigate(location.state.previousLocation.pathname);
	};

	const handleSelect = (dimension) => {
		console.log(selectedDimensionTrue,"selected True!")
		setSelectedDimension(dimension);
	};

	const loadPersona = async () => {
		// console.log(selectedDimensionTrue,"selected True!")
		const dimval = {"성격특성" : "무심한", "구매특성" : "신중한"}
		await axios
			.post(
				port + `youtube_api/${String(dimval)}/create-persona-exp/`,
				JSON.stringify(selectedDimensionTrue),
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				console.log(response);
				handleClose();
			})
			.catch((error) => {
				if (error.response && error.response.status === 404) {
					console.log("404 error: Resource not found");
				} else {
					console.log("An error occurred:", error);
				}
			});
	};

	useEffect(() => {
		if (selectedDimension) {
			Object.entries(selectedDimension).forEach((values) => {
				values[1].map((value) => {
					if (value?.selected == true) {
						setSelectedDimensionTrue((prevState) => ({
							...prevState,
							[values[0]]: value.value,
						}));
					}
				});
			});
		}
	}, [selectedDimension]);

	const threshold = 2;
	const disabled = selectedDimension
		? Object.values(selectedDimension)
				.map((values) => values.filter(({ selected }) => selected).length === 1)
				.reduce((acc, curr) => acc + curr, 0) < threshold
		: true;

	return (
		<Dialog open={true} onClose={handleClose} sx={{ padding: "100px" }}>
			<DialogContent>
				{/* <SelectPersona extendable={true} /> */}
				<SelectAttributes
					attributes={location.state.attribute}
					extendable={true}
					onSelect={handleSelect}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>닫기</Button>
				<Button
					variant="contained"
					disabled={disabled}
					onClick={() => loadPersona()}
				>
					{disabled
						? `${threshold}개 이상의 특성을 골라주세요`
						: `프록소나 추가하기`}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DiscoverProxona;
