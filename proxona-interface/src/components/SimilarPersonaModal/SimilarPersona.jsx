import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import axios from "axios";
import ProxonaProfile from "../ProxonaProfile/ProxonaProfile";
import "./SimilarPersona.css";
import { Wrapper } from "../../pages/styles/DesignSystem";

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
		<Wrapper>
			<div className="container similarPerona_container" ref={modalRef}>
				<div className="row">Get similar one</div>
				<div className="row">
					<div className="col">
						<div>original persona</div>
						<ProxonaProfile
							index={location.state.items[0].index}
							summary={location.state.items[0].summary}
							generated={location.state.items[0].generated}
							tags={location.state.items[0].tags}
							username={location.state.items[0].username}
						></ProxonaProfile>
					</div>
					<div className="col">
						<div>newly generated persona</div>
						<ProxonaProfile
							index={generated.index}
							summary={generated.summary}
							generated={generated.generated}
							tags={generated.tags}
							username={generated.username}
						></ProxonaProfile>
					</div>
				</div>
				<button
					className="btn"
					onClick={() => generateProfile(location.state.key)}
				>
					Try another one
				</button>
				<Link
					className="btn"
					role="button"
					onClick={() => navigate(location.state.previousLocation.pathname)}
				>
					Add to list
				</Link>
			</div>
		</Wrapper>
	);
};

export default SimilarPersona;
