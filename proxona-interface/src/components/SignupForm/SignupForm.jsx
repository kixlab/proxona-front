import React, { useEffect, useState } from "react";
import "./SignupForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MainButton } from "../../pages/styles/DesignSystem";

export const SignupForm = () => {
	const [formData, setFormData] = useState({
		handleId: "",
	});
	const [signIn, setSignIn] = useState(false);
	const port = "http://43.203.179.115:8000/"; //should be replaced to hosting address
	const navigate = useNavigate();

	const handleChange = (e) => {
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
						console.log("Success in response");
					}
					return;
				});
		} catch (error) {
			console.error("Error submitting form", error);
		}
	};

	useEffect(() => {
		if (signIn && formData.handleId) {
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
				{signIn && !formData.handleId && (
					<div>Please provide valid handle id (e.g., @HCI) </div>
				)}
			</form>
		</div>
	);
};
