import React, { useEffect, useState } from "react";
import "./SignupForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MainButton } from "../../pages/styles/DesignSystem";
import { port } from "../../data/port.js";
import { useDispatch } from "react-redux";
import { setChannel } from "../../redux/channelInfo.js";
import { Container, Input, Box, Stack, TextField } from "@mui/material";
import { setLoginInfo } from "../../redux/loginInfo.js";

export const SignupForm = () => {
	const [formData, setFormData] = useState({
		username: "",
		handle: "",
	});
	const [alert, setAlert] = useState(false);
	const [signIn, setSignIn] = useState(false);
	const [plot, setPlot] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleChange = (e) => {
		setAlert(false);

		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		try {
			const response = await axios.post(port + "youtube_api/login/", formData);

			if (response) {
				setSignIn(true);
				setAlert(false);
				console.log("Success in response");
			} else {
				setAlert(true);
			}
		} catch (error) {
			setAlert(true);
			console.error(error);
		}
	};

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		const response = await axios.get(
	// 			port + "youtube_api/" + formData.handleId + "/channel/",
	// 			{
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 			}
	// 		);
	// 		if (response.data[0].channel_handle == formData.handleId) {
	// 			setSignIn(true);
	// 			setAlert(false);
	// 			console.log("Success in response");
	// 		} else {
	// 			setAlert(true);
	// 		}
	// 	} catch (error) {
	// 		setAlert(true);
	// 		console.error(error);
	// 	}
	// };
	useEffect(() => {
		if (signIn && formData.handle) {
			dispatch(setLoginInfo(formData));
			navigate(`/${formData.handle}`, {
				state: { handleId: formData.handle, username: formData.username },
			});
			console.log("login success");
		}
	}, [signIn, plot]);

	return (
		<Container>
			<Stack>
				<Box
					component="form"
					onSubmit={handleSubmit}
					flex
					sx={{ alignItems: "center", flexDirection: "column" }}
				>
					<Box sx={{ m: 2 }}>
						<label for="handleId">
							<TextField
								sx={{ width: "300px" }}
								type="text"
								name="username"
								value={formData.username}
								onChange={handleChange}
								placeholder="type your experiment Id"
							/>
						</label>
					</Box>
					<Box sx={{ m: 2 }}>
						<label for="signInId">
							<TextField
								sx={{ width: "300px" }}
								type="text"
								name="handle"
								value={formData.handle}
								onChange={handleChange}
								placeholder="type your @handle id"
							/>
						</label>
					</Box>
					<MainButton type="submit" value="Start"></MainButton>
					{alert && (
						<div>
							Please confirm connection status or provide a valid information
							(e.g., @HCI){" "}
						</div>
					)}
				</Box>
			</Stack>
		</Container>
	);
};
