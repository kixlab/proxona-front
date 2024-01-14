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
	// const [topic, setTopic] = useState("");
	const [plot, setPlot] = useState(null);
	const [isDraftLoading, setIsDraftLoading] = useState(false);

	const navigate = useNavigate();

	const loadPlot = async () => {
		try {
			const response = await axios.get(`${port}youtube_api/${handleId}/plot/`)
			if (response.data !== "") {
				setPlot(response.data)
			}
		} catch (error) {
			console.error("Error loading plot", error);
		}
	}


	const getDraft = async (topic, callback) => {
		try {
			setIsDraftLoading(true);
			/**
			 * plot: Object
			 * id, topic, body
			 */
			let res;
			if (plot.id) {
				res = await axios.patch(
					port + `youtube_api/${handleId}/plot/${plot.id}/`,
					{
						topic,
					}
				);	
			} else {
				res = await axios.post(
					port + `youtube_api/${handleId}/plot/`,
					{
						topic,
					}
				);
			}
			
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
		getDraft(plot?.topic, () => navigate("draft"));
		console.log("createPlot is here");
	};

	const loadProxona = async () => {
		try {
			await axios.get(port + `youtube_api/${handleId}/proxona/`)
			.then((response) => {
				setProxonas(response.data);
			})
		} catch (error) {
			console.error("Error loading proxonas", error);
		} 
	}

	useEffect(() => {
		loadProxona();
	}, [])

	useEffect(() => {
		loadPlot();
	}, []);

	return (
		<Routes>
			<Route
				path="/"
				element={
					<FeedbackIntro
						topic={plot?.topic}
						setTopic={(newTopic) => setPlot({...plot, topic:newTopic})}
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
						plot={plot}
						goToNext={() => navigate(`editor/${handleId}`)}
						goToPrev={() => navigate(`/${handleId}/feedback`)}
						proxonas={proxonas}
					/>
				}
			/>
			<Route
				path="/editor/:plotId"
				element={<PlotPlanning plot={plot} proxonas={proxonas} />}
			/>
		</Routes>
	);
}

export default Feedback;
