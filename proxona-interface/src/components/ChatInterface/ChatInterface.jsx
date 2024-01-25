import React, { useEffect, useState, useRef, useCallback } from "react";
import "./ChatInterface.css";
import "../ProxonaProfile/ProxonaProfile.css";
import axios from "axios";
import { textMessage } from "../../data/dummy";
import { Link, useLocation, useParams } from "react-router-dom";
import { port } from "../../data/port";
import {
	Button,
	ButtonBase,
	Stack,
	Typography,
	Paper,
	InputBase,
	Divider,
	IconButton,
} from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { MentionsInput, Mention } from "react-mentions";
import { useSelector } from "react-redux";
import defaultStyle from "./defaultStyle";

export const ChatInterface = ({ proxonas }) => {
	// const [messages, setMessages] = useState(textMessage);
	const [messages, setMessages] = useState([]);

	const [inputMessage, setInputMessage] = useState("");
	const [initial, setInitial] = useState(true);
	const chatContainerRef = useRef(null);
	const mentionRef = useRef(null);
	const [botIsLoading, setBotIsLoading] = useState(false);
	const { id } = useParams();

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

	const filterMessage = (msg) => {
		const lastIndex = msg.lastIndexOf("AIMessage(content='");
		return lastIndex;
	};

	const getMessages = useCallback(async () => {
		setBotIsLoading(true);
		axios
			.post(port + `youtube_api/${id}/generate_response/`, {
				user_question: messages[messages.length - 1].text,
			})
			.then((res) => {
				// console.log(res.data);
				const mappedMessages = Object.entries(res.data).map((message) => ({
					who: message[0],
					text: message[1].substring(filterMessage(message[1] + 13)),
				}));
				setMessages([...messages, ...mappedMessages]);
				setBotIsLoading(false);
			});
	}, [messages]);

	useEffect(() => {
		if (messages.length > 0 && messages[messages.length - 1].who === "me") {
			getMessages();
		}
	}, [getMessages]);

	return (
		<Stack height={1} overflow={"hidden"}>
			<Stack flex={1} overflow={"auto"} ref={chatContainerRef}>
				{initial ? (
					<Stack spacing={20 / 8} alignSelf={"center"}>
						<Typography variant="h6">
							내 채널의 뷰어인 프록소나에게 마음껏 질문해보세요!
						</Typography>
						<Stack spacing={10 / 8}>
							{exampleQuestions.map((element, key) => {
								return (
									<Button
										key={key}
										ref={(refele) => (buttonRef.current[key] = refele)}
										variant="outlined"
										onClick={() =>
											setInputMessage(buttonRef.current[key].textContent)
										}
									>
										{element}
									</Button>
								);
							})}
						</Stack>
					</Stack>
				) : (
					messages.map((message, idx) =>
						message.who == "me" ? (
							<Stack alignSelf={"flex-end"} alignItems={"flex-end"} key={idx}>
								<Typography variant="caption">{message.who}</Typography>
								<Typography
									sx={{
										bgcolor: "#fff",
										color: "#1a1a1a",
										borderRadius: 10 / 4,
										px: 12 / 8,
										py: 10 / 8,
									}}
									paragraph={true}
								>
									{message.text}
								</Typography>
							</Stack>
						) : (
							<Stack
								key={idx}
								alignItems={"flex-start"}
								spacing={4 / 8}
								px={12 / 8}
							>
								<ButtonBase
									LinkComponent={Link}
									to={`${message.who}`}
									state={{ username: message.who }}
									sx={{
										color: "#fff",
										px: 8 / 8,
										ml: 4 / 8,
										borderRadius: 20 / 8,
										bgcolor: "#24292f",
									}}
								>
									<Typography variant="caption" sx={{ paddingRight: "10px" }}>
										{message.who}
									</Typography>
									<i class="bi bi-info-circle" style={{ fontSize: 12 }}></i>
								</ButtonBase>
								<Stack direction={"row"}>
									<Stack
										sx={{
											px: 12 / 8,
										}}
									>
										<i class="bi bi-emoji-smile"></i>
									</Stack>
									<Typography
										sx={{
											bgcolor: "#24292f",
											borderRadius: 10 / 4,
											px: 12 / 8,
											py: 10 / 8,
										}}
										paragraph={true}
										dangerouslySetInnerHTML={{ __html: message.text }}
									></Typography>
								</Stack>
							</Stack>
						)
					)
				)}
				{botIsLoading && (
					<Stack className="chat-wrapper bot">
						<Stack className="chat-message bot">Loading...</Stack>
					</Stack>
				)}
			</Stack>
			<Paper
				component="form"
				alignSelf="stretch"
				sx={{ p: "2px 4px", display: "flex", alignItems: "center", m: 1 }}
				onSubmit={(e) => {
					e.preventDefault();
					sendMessage(e.target.value);
				}}
			>
				{/* <InputBase
					disabled={botIsLoading ? true : false}
					sx={{ ml: 1, flex: 1 }}
					fullWidth
					inputProps={{ "aria-label": "search google maps" }}
					value={inputMessage}
					onChange={(e) => setInputMessage(e.target.value)}
					placeholder="또는, 내 채널의 뷰어인 프록소나에게 마음껏 질문해보세요!"
				> */}
				{proxonas.length > 0 && (
					<MentionsInput
						disabled={botIsLoading ? true : false}
						singleLine
						value={inputMessage}
						onChange={(e) => setInputMessage(e.target.value)}
						style={defaultStyle}
						placeholder={"Mention people using '@'"}
						a11ySuggestionsListLabel={"Suggested mentions"}
						inputRef={mentionRef}
					>
						<Mention
							data={proxonas.map((proxona) => ({
								id: proxona.name + "_" + proxona.id,
								display: proxona.name,
							}))}
							trigger="@"
							style={{ backgroundColor: "#6d53d3" }}
						/>
					</MentionsInput>
				)}
				{/* </InputBase> */}
				<IconButton
					disabled={botIsLoading ? true : false}
					type="submit"
					color="primary"
					sx={{ p: "10px" }}
					aria-label="search"
				>
					<KeyboardReturnIcon />
				</IconButton>
			</Paper>
		</Stack>
	);
};
