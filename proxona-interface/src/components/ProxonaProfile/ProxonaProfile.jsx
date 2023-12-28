import React, { useState } from "react";
import "./ProxonaProfile.css"; // 이 파일에 CSS 스타일을 정의하세요.
import { Link, useLocation } from "react-router-dom";

function ProxonaProfile({ index, username, summary, generated, tags }) {
	const location = useLocation();
	const styles = {
		index: {
			1: {
				borderColor: "#FFE8A3",
				borderWidth: "5px",
				color: "#FFE8A3",
			},
			2: {
				borderColor: "#9EE7A0",
				borderWidth: "5px",
				color: "#9EE7A0",
			},
			3: {
				borderColor: "#E4CCFF",
				borderWidth: "5px",
				color: "#E4CCFF",
			},
			// Add more index-color mappings as needed
		},
	};

	return (
		<div className="profile-container" style={styles.index[index]}>
			<Link
				style={{ color: "inherit", textDecoration: "inherit" }}
				to={username}
				state={{
					previousLocation: location,
					username: username,
					summary: summary,
					tags: tags,
				}}
			>
				<div className="header">
					<div className="user-info">
						<div className="user-face">
							<i className="bi bi-emoji-smile" style={styles.index[index]}></i>
						</div>
						<div className="user-name" style={styles.index[index]}>
							{username}
						</div>
					</div>
				</div>
				<div className="message">{summary}</div>
				<div className="selectors">
					{Object.values(tags).map((tag) => {
						return <div>{tag}</div>;
					})}
				</div>
			</Link>
		</div>
	);
}

export default ProxonaProfile;
