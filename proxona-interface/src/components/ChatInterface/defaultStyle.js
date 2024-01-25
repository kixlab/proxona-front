export default {
	control: {
		backgroundColor: "inherit",
		fontSize: "inherit",
		fontWeight: "normal",
	},

	"&multiLine": {
		control: {
			fontFamily: "monospace",
			minHeight: 63,
		},
		highlighter: {
			padding: 9,
			border: "1px solid transparent",
		},
		input: {
			padding: 9,
			border: "1px solid silver",
		},
	},

	"&singleLine": {
		display: "inline-block",
		width: "100%",

		highlighter: {
			padding: 1,
			border: "2px inset transparent",
		},
		input: {
			padding: 1,
			border: "2px inset",
			color: "#fff",
			borderColor: "transparent",
		},
	},

	suggestions: {
		list: {
			backgroundColor: "white",
			border: "1px solid rgba(0,0,0,0.15)",
			fontSize: 14,
		},
		item: {
			padding: "5px 15px",
			borderBottom: "1px solid rgba(0,0,0,0.15)",
			"&focused": {
				backgroundColor: "#6d53d3",
			},
		},
	},
};
