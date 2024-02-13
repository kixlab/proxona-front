import React, { useState } from "react";
import "./ProxonaProfile.css"; // 이 파일에 CSS 스타일을 정의하세요.
import {
	Avatar,
	Button,
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
	componentProps,
	disabled = false,
}) {
	return (
		<Stack
			component={ButtonBase}
			alignItems={"flex-start"}
			sx={{
				maxWidth: "400px",
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
			{/* <Link
					style={{ color: "inherit", textDecoration: "inherit" }}
					to={username}
					state={{
						previousLocation: location,
						username: username,
						summary: summary,
						tags: tags,
					}}
				> */}
			{/* <div className="header">
						<div className="user-info">
							<div className="user-face">
								<i
									className="bi bi-emoji-smile"
									style={styles.index[index]}
								></i>
							</div>
							<div className="user-name" style={styles.index[index]}>
								{username}
							</div>
						</div>
					</div> */}
			<Avatar variant="square" src={`/static/img/animal/${avatarImg}.png`} />
			<Typography variant="h6">{username}</Typography>
			<Typography paragraph>
				{summary}
				{/* {summary.replace(/(['"])([^'"]*?)\1/g, function (match, p1, p2) {
					return p1 === '"' ? "'" + p2 + "'" : '"' + p2 + '"';
				})} */}
			</Typography>
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
