import React, { useEffect, useState, useRef, useCallback } from "react";
import "./ChatInterface.css";
import "../ProxonaProfile/ProxonaProfile.css";
import axios from "axios";
import { textMessage } from "../../data/dummy";
import { Link, useLocation } from "react-router-dom";

//TODO
// [ ] scroll bottom to top when chat messages reach the bottom of the page
// [ ] suggestion : add suggestion messages
// [ ] change background color style

export const ChatInterface = () => {
	const [messages, setMessages] = useState(textMessage);
	const [inputMessage, setInputMessage] = useState("");
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
			setInitial(false);
			setMessages([...messages, { who: "me", text: inputMessage }]);
			setInputMessage(" ");
		}
	};

	const handleSubmit = (buttonRef) => {
		setMessages([...messages, { who: "me", text: buttonRef.textContent }]);
		setInitial(false);
	};

	const getMessages = useCallback(async () => {
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
				setMessages([...messages, ...res.data]);
			});
	}, [messages]);

	useEffect(() => {
		if (messages.length > 0 && messages[messages.length - 1].who === "me") {
			getMessages();
		}
	}, [getMessages]);

	return (
		<div className="container chat-container">
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
			<div className="chat-container-box">
				{!initial &&
					messages.map((message, idx) =>
						message.who == "me" ? (
							<div className="chat-wrapper" key={idx}>
								<div className="chat-name">{message.who}</div>
								<div className="chat-message">
									<div className="user-face">
										<i class="bi bi-emoji-smile"></i>
									</div>
									<p>{message.text}</p>
								</div>
							</div>
						) : (
							<div className="chat-wrapper bot" key={idx}>
								<Link role="button" className="btn chat-info">
									<i class="bi bi-info-circle"></i>
									<div className="chat-name bot">{message.who}</div>
								</Link>
								<div className="chat-message bot">
									<p dangerouslySetInnerHTML={{ __html: message.text }}></p>
									<div className="bot-face bot">
										<i class="bi bi-emoji-smile"></i>
									</div>
								</div>
							</div>
						)
					)}
			</div>
			<div className="input-container">
				{!initial && !messages ? <div>질문을 해보세요</div> : <div></div>}
				<input
					value={inputMessage}
					onChange={(e) => setInputMessage(e.target.value)}
					placeholder="또는, 내 채널의 뷰어인 프록소나에게 마음껏 질문해보세요!"
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
