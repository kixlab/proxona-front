import React from "react";

const FooterButton = () => {
	return (
		<div
			style={{
				position: "fixed",
				bottom: 0,
				right: 0,
			}}
		>
			<button className="btn btn-primary" style={{ marginRight: "10px" }}>
				Discover more proxona
			</button>
			<button className="btn btn-primary" style={{ marginRight: "80px" }}>
				Let's get feedback
			</button>
		</div>
	);
};

export default FooterButton;
