import React, { useState } from "react";
import { ChatInterface } from "../components/ChatInterface/ChatInterface";
import { FeedbackBoard } from "../components/FeedbackBoard/FeedbackBoard";

function Feedback() {
	return (
		<div className="container">
			<div className="row">
				<h2>비디오 플래닝</h2>
				<div className="col">
					<FeedbackBoard />
				</div>
				<div className="col-6">
					<ChatInterface />
				</div>
			</div>
		</div>
	);
}

export default Feedback;
