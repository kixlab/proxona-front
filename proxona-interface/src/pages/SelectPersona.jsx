import React, { useState, useEffect, useCallback, useMemo } from "react";
import { port } from "../data/port";
import { Stack, Button, Box, Typography, Container } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import SelectAttributes from "../components/SelectAttributes/SelectAttributes";
import { useDispatch, useSelector } from "react-redux";
import { initAttribute } from "../redux/attributeList.js";

const SelectPersona = ({ extendable }) => {
	const location = useLocation();
	const [attributes, setAttrubutes] = useState(null);
	const [data, setData] = useState(false);
	const { id } = useParams();
	const dispatch = useDispatch();
	const attributeList = useSelector((state) => state.attributeList.attributes);
	const { username, handle } = useSelector((state) => state.loginInfo);
	// console.log(handle);
	const loadData = async () => {
		try {
			await axios
				.get(port + `youtube_api/admin/${handle}/get-dim-val-def-set/`, {
					headers: { "Content-Type": "application/json" },
				})
				.then((response) => {
					// console.log(response);
					setAttrubutes(response.data);
					if (Object.keys(response.data).length > 0) {
						setData(true);
					}

					dispatch(initAttribute(response.data));
				});
		} catch (error) {
			console.error("Error submitting form", error);
		}
	};
	useEffect(() => {
		loadData();
	}, []);

	const handleSelect = () => {};

	return (
		<Container
			spacing={40 / 8}
			height={"100%"}
			overflow={"hidden"}
			justifyContent={"center"}
		>
			<Stack
				maxWidth={1440}
				width={1}
				py={40 / 8}
				height={"100%"}
				spacing={40 / 8}
			>
				<Stack alignItems={"center"}>
					<Typography variant="h5" gutterBottom>
						내 채널의 시청자들에 대해 얼마나 잘 알고 있나요?
					</Typography>
					<Typography variant="h4" gutterBottom>
						내 채널의 시청자들의 다양한 특성을 확인해보세요.
					</Typography>
				</Stack>
				{data ? (
					<SelectAttributes
						attributes={attributeList}
						// readonly={true}
						explainable={true}
						extendable={false}
						onSelect={handleSelect}
					/>
				) : (
					<div>no data loaded</div>
				)}

				<Button variant="contained" LinkComponent={Link} to={`/${id}/result`}>
					다음
				</Button>
			</Stack>
		</Container>
	);
};

export default SelectPersona;
