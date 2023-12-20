import React, { useEffect, useState } from "react";
import "./SignupForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SignupForm = () => {
	const [formData, setFormData] = useState({
		handleId: "",
	});
	const [signIn, setSignIn] = useState(false);
	const port = "http://localhost:8000/api";
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios
				.post(port, formData, {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then((response) => {
					setSignIn(true);
					console.log("Success in response");
					return response.json();
				});
		} catch (error) {
			console.error("Error submitting form", error);
		}
	};
	useEffect(() => {
		if (signIn) {
			navigate(`/persona/${formData.handleId}`);
			console.log("login success");
		}
	}, [signIn]);
	return (
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
			<input type="submit" value="Start"></input>
		</form>
	);
};
