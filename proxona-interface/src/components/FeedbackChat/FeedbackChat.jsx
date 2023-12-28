import React, { useEffect, useState, useRef, useCallback } from "react";
import "./FeedbackChat.css";
import "../ProxonaProfile/ProxonaProfile.css";
import axios from "axios";
import { textMessage } from "../../data/dummy";
import { Link, useLocation } from "react-router-dom";
import { Stack, Button, Input } from "@mui/material";

//TODO
// [ ] scroll bottom to top when chat messages reach the bottom of the page
// [ ] suggestion : add suggestion messages
// [ ] change background color style

export const FeedbackChat = () => {
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
		<Stack flex={1}>
			{initial && (
				<Stack alignItems={'flex-start'} flex={1}>
					내 채널의 뷰어인 프록소나에게 마음껏 질문해보세요!
					{exampleQuestions.map((element, key) => {
						return (
							<Button
								key={key}
								ref={(refele) => (buttonRef.current[key] = refele)}
								onClick={() => handleSubmit(buttonRef.current[key])}
								variant={"outlined"}
							>
								{element}
							</Button>
						);
					})}
				</Stack>
			)}
		
			<Stack direction={'row'}>
				{!initial && !messages ? <div>질문을 해보세요</div> : <div></div>}
				<Input
					fullWidth
					value={inputMessage}
					onChange={(e) => setInputMessage(e.target.value)}
					placeholder="또는, 내 채널의 뷰어인 프록소나에게 마음껏 질문해보세요!"
				/>

				<Button
					type="submit"
					variant="contained"
					onClick={sendMessage}
				>
					<i class="bi bi-send"></i>
				</Button>
			</Stack>
		</Stack>
	);
};
