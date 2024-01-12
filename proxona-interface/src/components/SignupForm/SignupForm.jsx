import React, { useEffect, useState } from "react";
import "./SignupForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MainButton } from "../../pages/styles/DesignSystem";
import { port } from "../../data/port.js";

export const SignupForm = () => {
	const [formData, setFormData] = useState({
		handleId: "",
	});
	const [alert, setAlert] = useState(false);
	const [signIn, setSignIn] = useState(false);
	// const port = "http://43.203.179.115:8000/"; //should be replaced to hosting address
	const navigate = useNavigate();

	const handleChange = (e) => {
		setAlert(false);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios
				.get(port + "youtube_api/" + formData.handleId + "/channel/", {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then((response) => {
					if (response.data[0].channel_handle == formData.handleId) {
						setSignIn(true);
						setAlert(false);
						console.log("Success in response");
					} else {
						setAlert(true);
					}
					return;
				});
		} catch (error) {
			setAlert(true);
			console.error(error);
		}
	};

	useEffect(() => {
		if (signIn && formData.handleId && !alert) {
			navigate(`/${formData.handleId}`, {
				state: { handleId: formData.handleId },
			});
			console.log("login success");
		}
	}, [signIn]);

	return (
		<div className="container form_container">
			<form onSubmit={handleSubmit}>
				<label for="handleId">
					<input
						type="text"
						name="handleId"
						value={formData.handleId}
						onChange={handleChange}
						placeholder="type your @handle id"
					/>
				</label>
				<MainButton type="submit" value="Start"></MainButton>
				{alert && <div>Please provide a valid handle-id (e.g., @HCI) </div>}
			</form>
		</div>
	);
};
