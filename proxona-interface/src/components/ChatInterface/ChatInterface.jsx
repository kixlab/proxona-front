import React, { useEffect, useState } from "react";
import "./ChatInterface.css";

export const ChatInterface = () => {
	const [messages, setMessages] = useState([]);
	const [inputMessage, setInputMessage] = useState(" ");

	const sendMessage = (e) => {
		if (inputMessage) {
			setMessages([...messages, { who: "me", text: inputMessage }]);
			setInputMessage(" ");
		}
	};

	return (
		<div className="container">
			<div className="chat-container">
				{messages.map((message, idx) => (
					<div>
						<div className="user-face">
							<i class="bi bi-emoji-smile"></i>
						</div>
						{message.who}
						<p key={idx}>{message.text}</p>
					</div>
				))}
			</div>
			<div className="input-container">
				<input
					className="inputbar-container"
					type="text"
					value={inputMessage}
					onChange={(e) => setInputMessage(e.target.value)}
				/>
				<button className="button-container" onClick={sendMessage}>
					Send
				</button>
			</div>
		</div>
	);
};
