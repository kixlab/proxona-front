import React from "react";

export const FinishPage = () => {
	return (
		<div
			style={{
				zIndex: 1000,
				position: "fixed",
				margin: "auto",
				top: "0",
				bottom: "0",
				left: "0",
				right: "0",
				height: "100%",
				width: "100%",
				backgroundColor: "black",
			}}
		>
			<div
				style={{
					lineHeight: "30",
					textAlign: "center",
				}}
			>
				<h3>
					실험이 종료되었습니다. 이어서 연구자의 안내에 따라 설문을
					진행해주세요.
				</h3>
			</div>
		</div>
	);
};
