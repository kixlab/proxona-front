import React, { useState, useRef, useEffect } from "react";
import { features } from "../../data/dummy";
import "./DiscoverProxona.css";

import { useNavigate, useLocation } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { ModalWrapper } from "../../pages/styles/DesignSystem";
import SelectPersona from "../../pages/SelectPersona";

const DiscoverProxona = () => {
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

	// const addDiffProfile = async (e) => {
	// 	try {
	// 		const res = await axios.post(
	// 			"http://localhost:8000/persona",
	// 			{ config: "diff", index: Object.keys(filteredProfile).length },
	// 			{
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 			}
	// 		);
	// 		if (res) {
	// 			setProfiles([...profiles, ...res.data]);
	// 		}
	// 	} catch (err) {
	// 		console.error("Error fetching new profiles", err);
	// 	}
	// };

	return (
		<ModalWrapper>
			<div className="container detailproxona_container">
				<SelectPersona />
				<button>시청자 페르소나 만들기</button>
			</div>
		</ModalWrapper>
	);
};

export default DiscoverProxona;
