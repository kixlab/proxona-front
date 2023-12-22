import React, { useState } from "react";
import "./ProxonaProfile.css"; // 이 파일에 CSS 스타일을 정의하세요.

function ProxonaProfile({ username, summary, tags }) {

	return (
		<div className="profile-container m-6">
			<div className="header">
				<div className="user-info">
					<div className="user-face">
						<i class="bi bi-emoji-smile"></i>
					</div>
					<div className="user-name">{username}</div>
				</div>
			</div>
			<div className="message">
				<div className="message-content">{summary}</div>
			</div>
			<div className="selectors">
				{tags.map((tag) => {
					return <div>{tag}</div>;
				})}
			</div>
		</div>
	);
}

export default ProxonaProfile;
