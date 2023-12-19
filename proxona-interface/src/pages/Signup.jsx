import React, { useState } from "react";
import { SignupForm } from "../components/SignupForm/SignupForm";

function Signup() {
	return (
		<div className="container">
			<h2>{textContent.signupTitle}</h2>
			<p>{textContent.signupDescription}</p>
			<SignupForm />
		</div>
	);
}

export default Signup;
