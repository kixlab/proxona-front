import React, { useEffect, useState, useRef, useCallback } from "react";
import "./ChatInterface.css";
import "../ProxonaProfile/ProxonaProfile.css";
import axios from "axios";
// import { textMessage } from "../../data/dummy";
import { Link, useLocation, useParams } from "react-router-dom";
import { port } from "../../data/port";
import {
	Button,
	ButtonBase,
	Stack,
	Typography,
	Paper,
	Avatar,
	IconButton,
	CircularProgress,
} from "@mui/material";
import { avatars } from "../../data/avatar";

import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { MentionsInput, Mention } from "react-mentions";
import { useSelector } from "react-redux";
import defaultStyle from "./defaultStyle";

export const ChatInterface = ({ proxonas }) => {
	const [messages, setMessages] = useState([]);
	const location = useLocation();

	const [inputMessage, setInputMessage] = useState("");
	const [initial, setInitial] = useState(true);
	const chatContainerRef = useRef(null);
	const mentionRef = useRef(null);
	const [botIsLoading, setBotIsLoading] = useState(false);
	const { id } = useParams();
	const [values, setValues] = useState("");
	const { username, handle } = useSelector((state) => state.loginInfo);

	const buttonRef = useRef([]);
	const exampleQuestions = [
		"What kind of videos do you like?",
		"Why do you watch my videos?",
		"What's your favorite video among mine?",
		"What do you usually do in your spare time?",
	];

	const sendMessage = (e) => {
		if (inputMessage) {
			setInitial(false);

			setMessages([...messages, { who: "me", text: inputMessage }]);
			setInputMessage(" ");
		}
	};

	const filterMessage = (msg) => {
		const lastIndex = msg.lastIndexOf("content=");
		const bracketIndex = msg.lastIndexOf(")");
		return [lastIndex, bracketIndex];
	};

	const getMessages = useCallback(async () => {
		setBotIsLoading(true);
		// console.log(messages);
		axios
			.post(port + `youtube_api/${username}/${id}/generate_response/`, {
				user_question: messages[messages.length - 1].text,
				mention: values.length > 0 ? true : false,
				whom: values.length > 0 ? values[0] : "none",
			})
			.then((res) => {
				console.log(res.data);
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
			});
	}, [messages]);

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
		<Stack height={1} overflow={"hidden"}>
			<Stack flex={1} overflow={"auto"} ref={chatContainerRef}>
				{initial ? (
					<Stack spacing={20 / 8} alignSelf={"center"}>
						<Typography variant="h6">
							내 채널의 뷰어인 시청자 페르소나에게 마음껏 질문해보세요!
						</Typography>
						<Typography
							variant="p"
							sx={{ textAlign: "center", color: "#808080" }}
						>
							You can ask these questions:
						</Typography>
						<Stack spacing={10 / 8}>
							{exampleQuestions.map((element, key) => (
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
							))}
						</Stack>
					</Stack>
				) : (
					messages.map((message, idx) =>
						message.who === "me" ? (
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
									component={Link}
									to={`${message.who}`}
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
													values,
													job,
													generated,
													idx,
												}) => {
													return {
														job: job,
														generated: generated,
														username: name,
														videos: videos,
														summary: description,
														reason: reason,
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
									<i className="bi bi-info-circle" style={{ fontSize: 12 }}></i>
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
							<CircularProgress />{" "}
							<span>페르소나들이 답변을 준비하는 중...</span>
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
				{proxonas.length > 0 && (
					<MentionsInput
						disabled={botIsLoading ? true : false}
						singleLine
						value={inputMessage}
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
						placeholder={
							"Tag a specific persona by using '@name' in front of your question!"
						}
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
				)}
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
