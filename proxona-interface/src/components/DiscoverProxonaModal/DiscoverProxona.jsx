import React, { useState, useRef, useEffect, useCallback } from "react";
import "./DiscoverProxona.css";
import axios from "axios";
import { port } from "../../data/port";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Typography,
} from "@mui/material";
import SelectAttributes from "../SelectAttributes/SelectAttributes";
import { useDispatch, useSelector } from "react-redux";
import { addPersona } from "../../redux/personaList.js";

const DiscoverProxona = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id } = useParams();

	const [selectedDimension, setSelectedDimension] = useState(null);
	const [selectedDimensionTrue, setSelectedDimensionTrue] = useState([]);
	const [clickCustomize, setClickCustomize] = useState(false);
	const dispatch = useDispatch();
	const { username, handle } = useSelector((state) => state.loginInfo);

	const handleClose = () => {
		navigate(location.state.previousLocation.pathname);
	};

	const handleSelect = (dimension) => {
		setSelectedDimension(dimension);
	};

	const loadPersona = async () => {
		setClickCustomize(true);
		await axios
			.post(port + `youtube_api/${username}/${id}/create-persona-exp/`, {
				dim_val: selectedDimensionTrue,
			})
			.then((response) => {
				console.log(response);
				dispatch(addPersona(response.data));
				setClickCustomize(false);
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
		<Dialog
			open={true}
			onClose={handleClose}
			fullWidth={true}
			maxWidth={"lg"}
			sx={{ padding: "50px" }}
		>
			<DialogContent>
				<Typography variant="h5" gutterBottom>
					Discover more proxona
				</Typography>
				{/* <SelectPersona extendable={true} /> */}
				<SelectAttributes
					attributes={location?.state?.attribute}
					extendable={true}
					onSelect={handleSelect}
				/>
			</DialogContent>
			<DialogActions>
				<Button disabled={clickCustomize} onClick={handleClose}>
					닫기
				</Button>
				<Button
					variant="contained"
					disabled={disabled | clickCustomize}
					onClick={() => loadPersona()}
				>
					{disabled
						? `${threshold}개 이상의 특성을 골라주세요`
						: clickCustomize
						? `추가 중...`
						: `프록소나 추가하기`}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DiscoverProxona;
