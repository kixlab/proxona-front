import React, { useState, useRef, useEffect } from "react";
import { features } from "../../data/dummy";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import axios from "axios";
import ProxonaProfile from "../ProxonaProfile/ProxonaProfile";

const SimilarPersona = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const modalRef = useRef();

	useEffect(() => {
		const observerRefValue = modalRef.current;
		disableBodyScroll(observerRefValue);
		return () => {
			if (observerRefValue) {
				enableBodyScroll(observerRefValue);
			}
		};
	}, []);
	console.log(location);

	const addSimProfile = async (key) => {
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
				// setProfiles([...profiles, ...res.data]);
				navigate(location.state.previousLocation.pathname);
			}
		} catch (err) {
			console.error("Error fetching new profiles", err);
		}
	};

	return (
		<div className="container-bg">
			<div className="container detailproxona_container d-flex flex-column p-5">
				<div className="header">Get similar one</div>
				<div>original persona</div>
				<ProxonaProfile
					index={location.state.items[0].index}
					summary={location.state.items[0].summary}
					generated={location.state.items[0].generated}
					tags={location.state.items[0].tags}
					username={location.state.items[0].username}
				></ProxonaProfile>

				<div>newly generated persona</div>
				<button className="btn">Try another one</button>
				<Link role="button" onClick={() => addSimProfile(location.state.key)}>
					Add to list
				</Link>
			</div>
		</div>
	);
};

export default SimilarPersona;
