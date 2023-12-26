import React, { useState } from "react";
import "./ProxonaProfile.css"; // 이 파일에 CSS 스타일을 정의하세요.
import { Link, useLocation } from "react-router-dom";

function ProxonaProfile({ username, summary, generated, tags }) {
	const location = useLocation();

	return (
		<div className={`profile-container ${generated ? "thread" : ""}`}>
			<Link
				to={username}
				state={{
					previousLocation: location,
					username: username,
					message: summary,
					tags: tags,
				}}
			>
				<div className="header">
					<div className="user-info">
						<div className="user-face">
							<i class="bi bi-emoji-smile"></i>
						</div>
						<div className="user-name">{username}</div>
					</div>
				</div>
				<div className="message">{summary}</div>
				<div className="selectors">
					{tags.map((tag) => {
						return <div>{tag}</div>;
					})}
				</div>
			</Link>
		</div>
	);
}

export default ProxonaProfile;
