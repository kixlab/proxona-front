import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const tools = [];
const openai = process.env.OPENAI;

//openai configuration
const chatmodel = new ChatOpenAI({
	temperature: 0,
	openAIApiKey: openai,
});

// https://www.learnbestcoding.com/post/139/how-to-fix-react-js-typeerror-failed-to-fetch
const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true,
};

//middleware
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

//sign-up
app.post("/api", (req, res) => {
	res.send("success");
});

//add persona
app.post("/persona", (req, res) => {
	if (req.body.config == "similar") {
		res.json([
			{
				index: req.body.index,
				generated: true,
				username: "Mina",
				summary: "디자인과 성능에 중점을 두는 비판적 사용자",
				tags: ["비판적", "직설적", "성능 중시", "디자인 중시"],
			},
		]);
	} else if (req.body.config == "diff") {
		res.json([
			{
				index: req.body.index + 1,
				username: "Haram",
				summary: "디자인과 성능에 중점을 두는 비판적 사용자",
				tags: ["비판적", "직설적", "성능 중시", "디자인 중시"],
			},
		]);
	}
});

//send chat
app.post("/chat", async (req, res) => {
	const messages = [new HumanMessage({ content: req.body.text })];
	const llmResult = await chatmodel.predictMessages(messages);

	res.send([
		{ who: "Bob", text: llmResult.content },
		{ who: "Katie", text: llmResult.content },
	]);
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
