import React, { useState, useRef, useEffect } from "react";
import { features } from "../../data/dummy";
import "./DiscoverProxona.css";

import { useNavigate, useLocation } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { ModalWrapper } from "../../pages/styles/DesignSystem";

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
				<button
					className="btn"
					ref={modalRef}
					onClick={() => navigate(location.state.previousLocation.pathname)}
				>
					<i class="bi bi-x-lg"></i>
				</button>
				<p>
					내 채널의 시청자들은 어떠한 다양한 면을 가지고 있을까요? <br></br>
					시청자의 특성 3개 이상을 고르면, 그 특성을 반영한 시청자가
					만들어집니다.{" "}
				</p>
				{Object.keys(features).map((feature, key) => {
					return (
						<div
							className="d-flex flex-row justify-content-center align-items-center p-2"
							key={key}
						>
							<div>{feature}</div>
							{features[feature].map((element) => {
								return (
									<button className="btn btn-secondary m-2">{element}</button>
								);
							})}
						</div>
					);
				})}
				<button className="btn btn-secondary">시청자 페르소나 만들기</button>
			</div>
		</ModalWrapper>
	);
};

export default DiscoverProxona;
