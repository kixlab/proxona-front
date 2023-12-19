import React, { useState } from "react";
import "./SignupForm.css";
import { textContent } from "../../data/textContent";

export const SignupForm = () => {
	const [formData, setFormData] = useState(() => {
		handleId: "";
	});
	const port = 8000;
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("localhost:" + port, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			if (response.ok) {
			} else {
				console.error("Form submission failed");
			}
		} catch (err) {
			console.error("Error submitting form", error);
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<input type="text" placeholder="type your handle id"></input>
			<label
				for="handleId"
				value={formData.handleId}
				onChange={handleChange}
			></label>
			<input type="submit"></input>
		</form>
	);
};
