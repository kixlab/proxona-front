import React, { useEffect, useState } from "react";
import "./ChatInterface.css";
import axios from "axios";

export const ChatInterface = () => {
	const [messages, setMessages] = useState([]);
	const [inputMessage, setInputMessage] = useState(" ");
	const [initial, setInitial] = useState(true);
	const port = "http://localhost:8000/";

	const sendMessage = (e) => {
		if (inputMessage) {
			setMessages([...messages, { who: "me", text: inputMessage }]);
			setInputMessage(" ");
		}
	};

	useEffect(() => {
		if (messages.length > 0) {
			axios
				.post(
					port + "chat",
					{ text: messages[messages.length - 1].text },
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
				.then((res) => {
					setMessages([
						...messages,
						{ who: "bot", text: res.data.kwargs.content },
					]);
				});
		}
	}, [messages]);

	return (
		<div className="container">
			{initial && (
				<div className="example-questions">
					내 채널의 뷰어인 프록소나에게 마음껏 질문해보세요!
					<button type="button" className="btn btn-outline-secondary">
						1. 어떤 비디오를 좋아해?
					</button>
					<button type="button" className="btn btn-outline-secondary">
						2. 내 비디오를 왜 봐?
					</button>
					<button type="button" className="btn btn-outline-secondary">
						3. 이런 토픽의 비디오 만들건데 어떻게 생각해?
					</button>
				</div>
			)}
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
					type="text"
					value={inputMessage}
					onChange={(e) => setInputMessage(e.target.value)}
				/>
				<button
					type="submit"
					className="btn btn-primary button-container"
					onClick={sendMessage}
				>
					<i class="bi bi-send"></i>
				</button>
			</div>
		</div>
	);
};
