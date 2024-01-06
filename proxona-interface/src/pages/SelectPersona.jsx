import React, { useState, useEffect, useCallback, useMemo } from "react";
import { features2 } from "../data/dummy";
import { Stack, Button, Box, Typography } from "@mui/material";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
// import "./styles/index.css";
import SelectAttributes from "../components/SelectAttributes/SelectAttributes";

const SelectPersona = ({extendable}) => {

	const { id } = useParams();
	return (
		<Stack
			sx={{
				height: "100%",
				justifyContent: "center",
				alignItems: "center",
			}}
			spacing={40 / 8}
		>
			<Stack alignItems={'center'}>
				<Typography gutterBottom>
					내 채널의 시청자들에 대해 얼마나 잘 알고 있나요?
				</Typography>
				<Typography variant="h6" gutterBottom>
					내 채널의 시청자들의 다양한 특성을 확인해보세요.
				</Typography>
			</Stack>
			<SelectAttributes 
				readonly={true} 
				extendable={false}
			/>
			<Button variant="contained" LinkComponent={Link} to={`/${id}/result`}>다음</Button>
		</Stack>
	);
};

export default SelectPersona;
