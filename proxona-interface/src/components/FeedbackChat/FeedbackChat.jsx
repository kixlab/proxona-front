import React, { useEffect, useState, useRef, useCallback } from "react";
import "./FeedbackChat.css";
import "../ProxonaProfile/ProxonaProfile.css";
import axios from "axios";
import { textMessage } from "../../data/dummy";
import { Link, useLocation, useParams } from "react-router-dom";
import {
	Button,
	ButtonBase,
	Stack,
	Typography,
	Paper,
	InputBase,
	Divider,
	Avatar,
	IconButton,
	CircularProgress,
} from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { port } from "../../data/port";
import { MentionsInput, Mention } from "react-mentions";
import { avatars } from "../../data/avatar";
import defaultStyle from "../ChatInterface/defaultStyle";
import { Outlet } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

export const FeedbackChat = ({
	proxonas,
	setMessages,
	messages,
	botIsLoading,
	setBotIsLoading,
}) => {
	// const [messages, setMessages] = useState(textMessage);
	// const [messages, setMessages] = useState([]);
	const { id } = useParams();
	const [inputMessage, setInputMessage] = useState(
		"I’d love to hear your overall thoughts!"
	);
	const [initial, setInitial] = useState(true);
	const chatContainerRef = useRef(null);

	const location = useLocation();
	const mentionRef = useRef(null);
	const [values, setValues] = useState("");
	const { username, handle } = useSelector((state) => state.loginInfo);

	const buttonRef = useRef([]);
	const exampleQuestions = [
		"어떤 비디오를 좋아해?",
		"내 비디오를 왜 봐?",
		"이런 토픽의 비디오 만들건데 어떻게 생각해?",
	];

	const sendMessage = (e) => {
		if (inputMessage && inputMessage !== " ") {
			setInitial(false);
			setMessages([...messages, { who: "me", text: inputMessage }]);
			setInputMessage(" ");
		}
	};

	// const handleSubmit = (buttonRef) => {
	// 	setMessages([...messages, { who: "me", text: buttonRef.textContent }]);
	// 	setInitial(false);
	// };

	const filterMessage = (msg) => {
		const lastIndex = msg.lastIndexOf("content=");
		const bracketIndex = msg.lastIndexOf(")");
		return [lastIndex, bracketIndex];
	};

	// console.log(messages);

	const getMessages = useCallback(async () => {
		console.log({
			user_question: messages[messages.length - 1].text,
			mention: values.length > 0 ? true : false,
			whom: values.length > 0 ? values[0] : "none",
		});
		setBotIsLoading(true);

		axios
			.post(port + `youtube_api/${username}/${id}/plot/chat/`, {
				user_question: messages[messages.length - 1].text,
				mention: values.length > 0 ? true : false,
				whom: values.length > 0 ? values[0] : "none",
			})
			.then((res) => {
				// const data = res.data;
				// const excludeList = localStorage.getItem("excluding_names");
				// if (excludeList && excludeList.length) {
				// Object.entries(res.data).map(([key, values]) => {
				// 	if (excludeList.includes(key)) {
				// 		delete data[key];
				// 	}
				// });
				// console.log(data);

				// const mappedMessages = Object.entries(data).map((message) => ({
				// 	who: message[0],
				// 	text: message[1].substring(
				// 		filterMessage(message[1])[0] + 9,
				// 		filterMessage(message[1])[1] - 2
				// 	),
				// }));
				// console.log(res.data);

				const mappedMessages = Object.entries(res.data).map((message) => ({
					who: message[0],
					text: message[1].substring(
						filterMessage(message[1])[0] + 9,
						filterMessage(message[1])[1] - 2
					),
				}));
				setMessages([...messages, ...mappedMessages]);
				setBotIsLoading(false);
				setValues("");
				// }
			});
	}, [messages]);

	useEffect(() => {
		sendMessage();
	}, []);

	useEffect(() => {
		if (messages.length > 0 && messages[messages.length - 1].who === "me") {
			getMessages();
		}
	}, [getMessages]);

	useEffect(() => {
		const scrollToBottom = () => {
			if (chatContainerRef.current) {
				chatContainerRef.current.scrollTop =
					chatContainerRef.current.scrollHeight;
			}
		};

		scrollToBottom();
	}, [messages, botIsLoading]);

	return (
		<>
			<Stack height={1} overflow={"hidden"}>
				<Stack flex={1} overflow={"auto"} ref={chatContainerRef}>
					{initial ? (
						<Stack spacing={20 / 8} alignSelf={"center"} py={40 / 8}>
							<Typography variant="h6">
								Feel free to ask questions to the viewer personas of my channel!
							</Typography>
							<Stack spacing={10 / 8}>
								{exampleQuestions.map((element, key) => {
									return (
										<button
											key={key}
											ref={(refele) => (buttonRef.current[key] = refele)}
											type="button"
											onClick={() =>
												setInputMessage(buttonRef.current[key].textContent)
											}
											className="btn btn-secondary"
										>
											{element}
										</button>
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
										to={`persona/${message.who}`}
										state={
											proxonas
												.filter((proxona) => proxona.name.includes(message.who))
												.map(
													({
														name,
														cluster_id,
														videos,
														description,
														reason,
														idx,
														values,
														experience,
														job,
														generated,
													}) => {
														return {
															experience: experience,
															generated: generated,
															job: job,
															username: name,
															videos: videos,
															reason: reason,
															summary: description,
															tags: values,
															avatarImg: avatars[idx],
															previousLocation: location,
														};
													}
												)[0]
										}
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
											<Avatar
												sx={{ width: 30, height: 30 }}
												variant="square"
												src={`/static/img/animal/${
													avatars[
														proxonas.filter((proxona) =>
															proxona.name.includes(message.who)
														)[0]["idx"]
													]
												}.png`}
											/>
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
							<Stack className="chat-message bot">
								<CircularProgress />
							</Stack>
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
					<MentionsInput
						sx={{ ml: 1, flex: 1 }}
						fullWidth
						inputProps={{ "aria-label": "search google maps" }}
						value={inputMessage}
						disabled={botIsLoading ? true : false}
						singleLine
						onChange={(e, newValue, newPlainTextValue, mentions) => {
							if (mentions.length > 0) {
								mentions.map(({ display }) => {
									const removeAt = display.replace("@", "");
									setValues([removeAt, ...values]);
								});
							}
							setInputMessage(newPlainTextValue);
						}}
						style={defaultStyle}
						placeholder={"Mention people using '@'"}
						a11ySuggestionsListLabel={"Suggested mentions"}
						inputRef={mentionRef}
					>
						<Mention
							data={proxonas.map((proxona) => ({
								id: proxona.name + "_" + proxona.id,
								display: "@" + proxona.name,
							}))}
							appendSpaceOnAdd={true}
							trigger="@"
							style={{ backgroundColor: "#6d53d3" }}
						/>
					</MentionsInput>
					<IconButton
						type="submit"
						color="primary"
						sx={{ p: "10px" }}
						aria-label="search"
					>
						<KeyboardReturnIcon />
					</IconButton>
				</Paper>
			</Stack>
		</>
	);
};
