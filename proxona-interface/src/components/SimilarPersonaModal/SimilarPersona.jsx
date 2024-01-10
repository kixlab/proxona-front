import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import axios from "axios";
import ProxonaProfile from "../ProxonaProfile/ProxonaProfile";
import "./SimilarPersona.css";
import { ModalWrapper, PrimButton } from "../../pages/styles/DesignSystem";
import { Button, Dialog, Stack, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { avatars } from "../../data/avatar";

const SimilarPersona = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [generated, setGenerated] = useState({
		index: "",
		username: "",
		summary: "",
		generated: true,
		tags: [],
	});

	useEffect(() => {
		generateProfile(location.state.key);
	}, [generated]);

	const generateProfile = useCallback(async (key) => {
		try {
			const res = await axios.post(
				"http://localhost:8000/persona",
				{ config: "similar", index: key },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (res) {
				setGenerated(res.data[0]);
			}
		} catch (err) {
			console.error("Error fetching new profiles", err);
		}
	});

	const handleClose = () => {
		navigate(location.state.previousLocation.pathname);
	};

	const addToList = () => {
		// add generated proxona to list
		handleClose();
	};

	return (
		<Dialog open={true} onClose={handleClose}>
			<IconButton
				aria-label="close"
				onClick={handleClose}
				sx={{
					position: "absolute",
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
			>
				<CloseIcon />
			</IconButton>
			<Stack direction="column" className="container similarPerona_container">
				<Typography variant="h6">Get similar one</Typography>
				<Stack
					direction="row"
					alignItems="center"
					spacing={2}
					justifyContent="center"
				>
					<Stack flex={1} spacing={1}>
						<Typography>Original proxona</Typography>
						<ProxonaProfile
							index={location.state.items[0].index}
							summary={location.state.items[0].summary}
							tags={location.state.items[0].tags}
							username={location.state.items[0].username}
							avatarImg={avatars[location.state.items[0].index]}
							disabled
						/>
					</Stack>
					<div className="col">
						<i class="bi bi-arrow-right"></i>
					</div>
					<Stack flex={1} spacing={1}>
						<Typography>Generated proxona</Typography>

						<ProxonaProfile
							index={generated.index}
							summary={generated.summary}
							generated={generated.generated}
							tags={generated.tags}
							username={generated.username}
							avatarImg={avatars[location.state.items[0].index]}
							disabled
						/>
					</Stack>
				</Stack>
				<Stack
					direction="row"
					spacing={2}
					justifyContent="flex-end"
					paddingTop={2}
				>
					<Button
						variant="outlined"
						onClick={() => generateProfile(location.state.key)}
					>
						Try another one
					</Button>

					<Button variant="contained" onClick={addToList}>
						Add to list
					</Button>
				</Stack>
			</Stack>
		</Dialog>
	);
};

export default SimilarPersona;
