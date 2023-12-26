import React, { useState, useRef, useEffect } from "react";
import "./ProxonaProfile.css"; // 이 파일에 CSS 스타일을 정의하세요.
import { useNavigate, useLocation } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

function ProxonaDetailModal() {
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

	return (
		<div className="profile-detail-bg">
			<div className="profile-detail-container">
				<div className="header">
					<div className="user-info">
						<div className="user-face">
							<i class="bi bi-emoji-smile"></i>
						</div>
						<div className="user-name">{location.state.username}</div>
					</div>
				</div>
				<div className="message">{location.state.summary}</div>
				<div className="selectors">
					{location.state.tags.map((tag) => {
						return <div>{tag}</div>;
					})}
				</div>
				<button
					className="btn btn-outline-secondary"
					ref={modalRef}
					onClick={() => navigate(location.state.previousLocation.pathname)}
				>
					Close
				</button>
			</div>
		</div>
	);
}

export default ProxonaDetailModal;
