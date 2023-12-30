import React, { useState } from "react";
import { SignupForm } from "../components/SignupForm/SignupForm";
import { textContent } from "../data/textContent";
import "./styles/index.css";

function Signup() {
	return (
		<div className="container signup_container">
			<h4>Meet your </h4>
			<h2>PROXONA</h2>
			<p>
				Understand your audience<br></br>
				Generating audience personas<br></br>
				Collaborate on your video plot
			</p>
			<SignupForm />
		</div>
	);
}

export default Signup;
