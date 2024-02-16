import React, { useState } from "react";
import "./ProxonaProfile.css"; // 이 파일에 CSS 스타일을 정의하세요.
import {
	Avatar,
	Button,
	Item,
	ButtonBase,
	Chip,
	Stack,
	Typography,
} from "@mui/material";

function ProxonaProfile({
	avatarImg,
	username,
	summary,
	tags,
	generated,
	componentProps,
	disabled = false,
}) {
	return (
		<Stack
			component={ButtonBase}
			alignItems={"flex-start"}
			sx={{
				width: "400px",
				border: "1px solid #fff",
				borderRadius: 2,
				bgcolor: "#fff",
				color: "#111",
				p: 2,
				transition: "all .25s",
				"&:hover": {
					bgcolor: "#e1e1e7",
				},
			}}
			disabled={disabled}
			{...componentProps}
		>
			<Stack
				flex
				sx={{ width: "100%" }}
				direction="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Avatar variant="square" src={`/static/img/animal/${avatarImg}.png`} />

				{generated ? (
					<Chip
						sx={{ bgcolor: "#e1e1e7", color: "#111" }}
						size="small"
						label={"created by AI"}
					/>
				) : (
					<div></div>
				)}
			</Stack>
			<Typography variant="h6">{username}</Typography>
			<Typography paragraph>{summary}</Typography>
			<Stack direction={"row"} flexWrap={"wrap"} gap={10 / 8}>
				{tags &&
					tags
						.map((tag) => tag["name"])
						.map((tag) => {
							return <Chip label={`#${tag}`} color="primary" size="small" />;
						})}
			</Stack>

			{/* </Link> */}
		</Stack>

		// 	</div>
		// </div>
	);
}

export default ProxonaProfile;
