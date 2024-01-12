import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FeedbackIntro } from "../components/FeedbackIntro/FeedbackIntro";
import { FeedbackDraft } from "../components/FeedbackDraft/FeedbackDraft";
import PlotPlanning from "./PlotPlanning";
import { port } from "../data/port";

function Feedback() {
	const [proxonas, setProxonas] = useState([]);
	const { id: handleId } = useParams();
	const [topic, setTopic] = useState("");
	const [plot, setPlot] = useState(null);
	const [isDraftLoading, setIsDraftLoading] = useState(false);

	const navigate = useNavigate();

	const getFinalProxonas = async () => {
		try {
			const res = await axios.get(
				`http://localhost:8000/handle/${handleId}/proxonas/final/`,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (res) {
				setProxonas([...res.data]);
			}
		} catch (err) {
			console.error("Error fetching final proxonas", err);
		}
	};

	// for testing..
	const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

	const getDraft = async (topic, callback) => {
		try {
			setIsDraftLoading(true);
			await sleep(1000);
			/**
			 * plot: Object
			 * id, topic, body
			 */

			const res = await axios.post(
				port + `youtube_api/${handleId}/plot-draft/`,
				{
					topic: topic,
				}
			);
			if (res) {
				setPlot(res.data);
				callback();
			}
		} catch (err) {
			console.error("Error creating new draft(plot)", err);
		} finally {
			setIsDraftLoading(false);
		}
	};

	const createPlot = () => {
		getDraft(topic, () => navigate("draft"));
		console.log("createPlot is here");
	};

	useEffect(() => {
		// getFinalProxonas();
	}, []);

	return (
		<Routes>
			<Route
				path="/"
				element={
					<FeedbackIntro
						topic={topic}
						setTopic={setTopic}
						isLoading={isDraftLoading}
						goToNext={() => {
							createPlot();
						}}
					/>
				}
			/>
			<Route
				path="/draft"
				element={
					<FeedbackDraft
						channel={handleId}
						topic={topic}
						draft={plot?.draft}
						goToNext={() => navigate(`editor/${handleId}`)}
						goToPrev={() => navigate(`/${handleId}/feedback`)}
						proxonas={proxonas}
					/>
				}
			/>
			<Route
				path="/editor/:plotId"
				element={<PlotPlanning topic={topic} draft={plot?.draft} />}
			/>
		</Routes>
	);
}

export default Feedback;
