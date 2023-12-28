import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FeedbackIntro } from "../components/FeedbackIntro/FeedbackIntro";
import { FeedbackDraft } from "../components/FeedbackDraft/FeedbackDraft";
import PlotPlanning from "./PlotPlanning";

function Feedback() {

	const [proxonas, setProxonas] = useState([])
	const {id:handleId} = useParams()
	const [topic, setTopic] = useState('')
	const [plot, setPlot] = useState(null)
	const [isDraftLoading, setIsDraftLoading] = useState(false)

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
				setProxonas([...res.data])
			}
		} catch (err) {
			console.error("Error fetching final proxonas", err);
		}
	};

	// for testing..
	const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));

	const getDraft = async (topic, callback) => {
		try {
			setIsDraftLoading(true)
			await sleep(1000);
			/**
			 * plot: Object
			 * id, topic, body
			 */

			const res = {data: {id: 4, topic, body: ''} }

			// const res = await axios.post(
			// 	`http://localhost:8000/handle/${handleId}/plot`,
			// 	{ topic },
			// 	{
			// 		headers: {
			// 			"Content-Type": "application/json",
			// 		},
			// 	}
			// );
			if (res) {
				setPlot(res.data)
				callback()
			}
		} catch (err) {
			console.error("Error creating new draft(plot)", err);
		} finally {
			setIsDraftLoading(false)
		}
	};

	const createPlot = () => {
		getDraft(topic, () => navigate('draft'))
		console.log("createPlot is here")
	}

	useEffect(() => {
		// getFinalProxonas();
	}, [])

	return (
		<Routes>
			<Route path="/" element={
				<FeedbackIntro
					topic={topic}
					setTopic={setTopic}
					isLoading={isDraftLoading}
					goToNext={() => {
						createPlot()
					}}
				/>
			}
			/>
			<Route path="/draft" element={
				<FeedbackDraft
					topic={topic}
					draft={plot?.body}
					goToNext={() => navigate(`editor/${plot.id}`)}
					goToPrev={() => navigate(`/feedback/${handleId}`)}
					proxonas={proxonas}
				/>
			}/>
			<Route path="/editor/:plotId" element={ 
				<PlotPlanning/>
			}/>
		</Routes>
	);
}

export default Feedback;
