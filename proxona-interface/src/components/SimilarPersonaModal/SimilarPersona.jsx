import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import axios from "axios";
import ProxonaProfile from "../ProxonaProfile/ProxonaProfile";
import "./SimilarPersona.css";
import { ModalWrapper } from "../../pages/styles/DesignSystem";

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
			<div className="container similarPerona_container" ref={modalRef}>
				<div className="row align-items-center">
					<div className="col">
						<div className="m-3">original persona</div>
						<ProxonaProfile
							index={location.state.items[0].index}
							summary={location.state.items[0].summary}
							generated={location.state.items[0].generated}
							tags={location.state.items[0].tags}
							username={location.state.items[0].username}
						></ProxonaProfile>
					</div>
					<div className="col">
						<i class="bi bi-arrow-right"></i>
					</div>
					<div className="col">
						<div className="m-3">newly generated persona</div>
						<ProxonaProfile
							index={generated.index}
							summary={generated.summary}
							generated={generated.generated}
							tags={generated.tags}
							username={generated.username}
						></ProxonaProfile>
					</div>
				</div>
				<div className="d-flex flex-end justify-content-end mt-3">
					<button
						className="btn btn-secondary m-2"
						onClick={() => generateProfile(location.state.key)}
					>
						Try another one
					</button>
					<Link
						className="btn btn-secondary m-2"
						role="button"
						onClick={() => navigate(location.state.previousLocation.pathname)}
					>
						Add to list
					</Link>
				</div>
			</div>
		</ModalWrapper>
	);
};

export default SimilarPersona;
