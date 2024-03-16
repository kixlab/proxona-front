import React, { useState } from "react";
import { SignupForm } from "../components/SignupForm/SignupForm";
import { textContent } from "../data/textContent";
import "./styles/index.css";
import { Container, Typography } from "@mui/material";

function Signup() {
	return (
		<Container>
			<div className="container signup_container">
				<Typography variant="h2" mb={2}>
					PROXONA
				</Typography>
				<Typography mb={2} sx={{ color: "#D9D9D9" }}>
					가상의 시청자를 만나고, 그들과 대화를 나누며,<br></br>
					시청자들이 좋아할 만한 비디오를 기획해보세요.
				</Typography>
				<SignupForm />
			</div>
		</Container>
	);
}

export default Signup;
