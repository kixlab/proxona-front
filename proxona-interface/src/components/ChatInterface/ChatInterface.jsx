import React, { useEffect, useState, useRef } from "react";
import "./ChatInterface.css";
import axios from "axios";

export const ChatInterface = () => {
	const [messages, setMessages] = useState([]);
	const [inputMessage, setInputMessage] = useState(" ");
	const [initial, setInitial] = useState(true);
	const port = "http://localhost:8000/";
	const buttonRef = useRef([]);
	const exampleQuestions = [
		"어떤 비디오를 좋아해?",
		"내 비디오를 왜 봐?",
		"이런 토픽의 비디오 만들건데 어떻게 생각해?",
	];

	const sendMessage = (e) => {
		if (inputMessage) {
			setMessages([...messages, { who: "me", text: inputMessage }]);
			setInputMessage(" ");
		}
	};

	const handleSubmit = (buttonRef) => {
		setMessages([...messages, { who: "me", text: buttonRef.textContent }]);
		setInitial(false);
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
		<div className="container chat-interface">
			{initial && (
				<div className="example-questions">
					내 채널의 뷰어인 프록소나에게 마음껏 질문해보세요!
					{exampleQuestions.map((element, key) => {
						return (
							<button
								key={key}
								ref={(refele) => (buttonRef.current[key] = refele)}
								type="button"
								onClick={() => handleSubmit(buttonRef.current[key])}
								className="btn btn-outline-secondary"
							>
								{element}
							</button>
						);
					})}
				</div>
			)}
			<div className="chat-container">
				{messages.map((message, idx) => (
					<div key={idx}>
						<div className="chat-name">{message.who}</div>
						<div className="chat-message">
							<div className="user-face">
								<i class="bi bi-emoji-smile"></i>
							</div>
							<p>{message.text}</p>
						</div>
					</div>
				))}
			</div>
			<div className="input-container">
				<input
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
