import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import axios from "axios";
import ProxonaProfile from "../ProxonaProfile/ProxonaProfile";
import "./SimilarPersona.css";
import { ModalWrapper, PrimButton } from "../../pages/styles/DesignSystem";
import { Stack } from "@mui/material";

const SimilarPersona = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const modalRef = useRef();
	const [generated, setGenerated] = useState({
		index: "",
		username: "",
		summary: "",
		generated: true,
		tags: [],
	});

	useEffect(() => {
		const observerRefValue = modalRef.current;
		disableBodyScroll(observerRefValue);
		return () => {
			if (observerRefValue) {
				enableBodyScroll(observerRefValue);
			}
		};
	}, []);

	useEffect(() => {
		generateProfile(location.state.key);
	}, [generated]);

	const generateProfile = useCallback(async (key) => {
		try {
			const res = await axios.post(
				"http://localhost:8000/persona",
				{ config: "similar", index: key },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (res) {
				setGenerated(res.data[0]);
			}
		} catch (err) {
			console.error("Error fetching new profiles", err);
		}
	});

	const addToList = () => {};

	return (
		<ModalWrapper>
			<Stack
				direction="column"
				className="container similarPerona_container"
				ref={modalRef}
			>
				<Stack>Get similar one</Stack>
				<Stack
					direction="row"
					alignItems="center"
					spacing={2}
					justifyContent="center"
				>
					<Stack className="col">
						<div>original persona</div>
						<ProxonaProfile
							index={location.state.items[0].index}
							summary={location.state.items[0].summary}
							generated={location.state.items[0].generated}
							tags={location.state.items[0].tags}
							username={location.state.items[0].username}
						></ProxonaProfile>
					</Stack>
					<div className="col">
						<i class="bi bi-arrow-right"></i>
					</div>
					<Stack className="col">
						<div>newly generated persona</div>
						<ProxonaProfile
							index={generated.index}
							summary={generated.summary}
							generated={generated.generated}
							tags={generated.tags}
							username={generated.username}
						></ProxonaProfile>
					</Stack>
				</Stack>
				<Stack
					direction="row"
					spacing={2}
					justifyContent="flex-end"
					paddingTop={2}
				>
					<PrimButton
						className="button-next"
						onClick={() => generateProfile(location.state.key)}
					>
						Try another one
					</PrimButton>
					<PrimButton
						className="button-next"
						role="button"
						onClick={() => navigate(location.state.previousLocation.pathname)}
					>
						Add to list
					</PrimButton>
				</Stack>
			</Stack>
		</ModalWrapper>
	);
};

export default SimilarPersona;
