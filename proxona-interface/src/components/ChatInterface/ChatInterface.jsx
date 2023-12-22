import React, { useEffect, useState } from "react";

export const ChatInterface = () => {
	const [messages, setMessages] = useState([]);
	const [inputMessage, setInputMessage] = useState(" ");
	const sendMessage = () => {
		if (inputMessage) {
			setMessages([...messages, inputMessage]);
			setInputMessage(" ");
		}
	};

	return (
		<div className="container">
			<div className="messages">
				{messages.map((message, idx) => (
					<div>
						<div className="user-face">
							<i class="bi bi-emoji-smile"></i>
						</div>
						<p key={idx}>{message}</p>
					</div>
				))}
			</div>
			<input
				type="text"
				value={inputMessage}
				onChange={(e) => setInputMessage(e.target.value)}
			/>
			<button onClick={sendMessage}>Send</button>
		</div>
	);
};
