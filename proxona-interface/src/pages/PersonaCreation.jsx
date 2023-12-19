import React, { useState } from "react";
import { textContent } from "../data/textContent.js";
import ProxonaProfile from "../components/ProxonaProfile/ProxonaProfile.jsx";

function PersonaCreation() {
	return (
		<div className="container p-5">
			<div className="row">
				<h2>{textContent.title}</h2>
			</div>
			<div className="row">
				<div className="row">
					<div className="col">{textContent.subTitle} (N)</div>
					<div className="col flex-grow-1"></div>
					<div className="col">
						<button className="btn" type="button">
							<i class="bi bi-arrow-left-circle"></i>
						</button>
						<button className="btn" type="button">
							<i class="bi bi-arrow-right-circle"></i>
						</button>
					</div>
				</div>
				<div className="creator-col user-board">
					<ProxonaProfile />
				</div>
			</div>
			<div className="row p-2">
				<div className="row d-flex">
					<div className="col">{textContent.otherTitle} (N)</div>
					<div className="col flex-grow-1"></div>
					<div className="col">
						<button className="btn" type="button">
							<i class="bi bi-arrow-left-circle"></i>
						</button>
						<button className="btn" type="button">
							<i class="bi bi-arrow-right-circle"></i>
						</button>
					</div>
				</div>
				<div className="creator-col competitor-board">
					<ProxonaProfile />
				</div>
			</div>
		</div>
	);
}

export default PersonaCreation;
