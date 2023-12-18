import React, { useState } from "react";
import "./ProxonaProfile.css"; // 이 파일에 CSS 스타일을 정의하세요.

function ProxonaProfile() {
	const [personality, setPersonality] = useState("");
	const [interest, setInterest] = useState("");

	return (
		<div className="profile-container">
			<div className="header">
				<div className="user-info">
					<div className="user-face">
						<i class="bi bi-emoji-smile"></i>
					</div>
					<div className="user-name">Bob</div>
				</div>
				<div className="majority">
					<div className="majority-title">대표성</div>
					<div className="majority-percent">80%</div>
				</div>
			</div>
			<div className="message">
				<div className="message-title">대표 코멘트</div>
				<div className="message-content">
					제기준 유투브 최고 패션 유투버인데 언니 구독자 왜 안느나요..? 북한의
					방해공작 아니에요..?
				</div>
			</div>
			<div className="selectors">
				<div>
					<div>Personality</div>
					<select
						value={personality}
						onChange={(e) => setPersonality(e.target.value)}
					>
						<option value="per1">옵션 1</option>
						<option value="per2">옵션 2</option>
						<option value="per3">옵션 3</option>
					</select>
				</div>
				<div>
					<div>Interest</div>
					<select
						value={interest}
						onChange={(e) => setInterest(e.target.value)}
					>
						<option value="int1">옵션 1</option>
						<option value="int2">옵션 2</option>
						<option value="int3">옵션 3</option>
					</select>
				</div>
			</div>
		</div>
	);
}

export default ProxonaProfile;
