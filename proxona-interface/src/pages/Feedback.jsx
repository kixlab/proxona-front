import React, { useEffect, useState } from "react";
import {
	Outlet,
	Route,
	Routes,
	useNavigate,
	useParams,
} from "react-router-dom";
import axios from "axios";
import { FeedbackIntro } from "../components/FeedbackIntro/FeedbackIntro";
import { FeedbackDraft } from "../components/FeedbackDraft/FeedbackDraft";
import ProxonaDetailModal from "../components/ProxonaProfile/ProxonaDetailModal";
import PlotPlanning from "./PlotPlanning";
import { port } from "../data/port";
import SelectFeedbackPersona from "./SelectFeedbackPersona";

function Feedback() {
	const [proxonas, setProxonas] = useState([]);
	const { id: handleId } = useParams();
	const [plot, setPlot] = useState({
		id: null,
		topic: null,
		body: null,
	});
	const [isDraftLoading, setIsDraftLoading] = useState(false);
	const [isNewDraftLoading, setNewDraftLoading] = useState(false);

	const navigate = useNavigate();

	const loadPlot = async () => {
		try {
			const response = await axios.get(port + `youtube_api/${handleId}/plot/`);
			console.log(response);
			if (response.data !== "" && !response.data.completed) {
				setPlot(response.data);
			}
		} catch (error) {
			console.error("Error loading plot", error);
		}
	};

	const getDraft = async (topic, callback) => {
		try {
			setIsDraftLoading(true);
			/**
			 * plot: Object
			 * id, topic, body
			 */
			let res;

			// if (plot.id) {
			// 	res = await axios.patch(
			// 		port + `youtube_api/${handleId}/plot/${plot.id}/`,
			// 		{
			// 			topic,
			// 		}
			// 	);
			// } else {
			res = await axios.post(port + `youtube_api/${handleId}/plot/`, {
				topic,
			});
			// }

			if (res) {
				setPlot(res.data);
				callback();
			}
		} catch (err) {
			console.error("Error creating new draft(plot)", err);
			if (plot) {
				callback();
			}
		} finally {
			setIsDraftLoading(false);
		}
	};

	const createPlot = () => {
		if (plot) {
			getDraft(plot?.topic, () => navigate("draft"));
		}

		// navigate("draft");
		console.log("createPlot is here");
	};

	const recreatePlot = async () => {
		try {
			setNewDraftLoading(true);
			const response = await axios.post(
				port + `youtube_api/${handleId}/plot/complete`,
				{
					completed: true,
				}
			);
			if (response) {
				setPlot({ ...plot, body: response.data.draft });
				setNewDraftLoading(false);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const loadProxona = async () => {
		try {
			await axios
				.get(port + `youtube_api/${handleId}/current-persona/`)
				.then((response) => {
					setProxonas(response.data);
				});
		} catch (error) {
			console.error("Error loading proxonas", error);
		}
	};

	useEffect(() => {
		loadProxona();
	}, []);

	useEffect(() => {
		loadPlot();
	}, []);

	return (
		<Routes>
			<Route path="/" element={<SelectFeedbackPersona proxonas={proxonas} />} />
			<Route
				path={`/topic`}
				element={
					<FeedbackIntro
						topic={plot?.topic}
						setTopic={(newTopic) => setPlot({ ...plot, topic: newTopic })}
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
						goToNext={() => navigate(`editor/${plot.id}`)}
						goToRegenerate={() => recreatePlot()}
						isLoading={isNewDraftLoading}
						// goToPrev={() => navigate(`/${handleId}/feedback`)}
						proxonas={proxonas}
					/>
				}
			/>
			<Route
				path="/editor/:plotId/"
				element={
					<>
						<PlotPlanning plot={plot} proxonas={proxonas} />
						<Outlet />
					</>
				}
			>
				<Route path="persona/:persona" element={<ProxonaDetailModal />} />
			</Route>
		</Routes>
	);
}

export default Feedback;
