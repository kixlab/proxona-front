import React, { useState, useEffect, useCallback, useMemo } from "react";
import { features2 } from "../data/dummy";
import { Stack, Button, Box } from "@mui/material";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import "./styles/index.css";

function groupBy(array, key) {
	return array.reduce((result, currentItem) => {
		// Get the value of the key for the current item
		const keyValue = currentItem[key];

		// If the key doesn't exist in the result object, initialize it with an empty array
		if (!result[keyValue]) {
			result[keyValue] = [];
		}

		// Add the current item to the array for the key
		result[keyValue].push(currentItem);

		return result;
	}, {}); // Initialize the result as an empty object
}

const SelectPersona = () => {
	const [personaEle, setPersonaEle] = useState(features2);
	const [selectedEle, setSelectedEle] = useState(features2);
	const [submittedEles, setSubmittedEles] = useState(null);
	const navigate = useNavigate();
	const { id } = useParams();

	const clickEle = useCallback((feature, element) => {
		// setSelectedEle(element);

		const result = groupBy(selectedEle, feature);
		setSelectedEle(result[element]);
	}, []);

	const mergedFeature = useMemo(() => {
		const mergedFeatures = personaEle.reduce((acc, curr) => {
			Object.entries(curr).forEach(([key, value]) => {
				if (!acc[key]) {
					acc[key] = [];
				}
				if (!acc[key].includes(value)) {
					acc[key].push(value);
				}
			});
			return acc;
		}, {});
		return mergedFeatures;
	}, [personaEle]);

	const mergedSelectFeature = useMemo(() => {
		const mergedSelectFeatures = selectedEle.reduce((acc, curr) => {
			Object.entries(curr).forEach(([key, value]) => {
				if (!acc[key]) {
					acc[key] = [];
				}
				if (!acc[key].includes(value)) {
					acc[key].push(value);
				}
			});
			return acc;
		}, {});
		return Object.values(mergedSelectFeatures).flat(1);
	}, [selectedEle]);

	useEffect(() => {
		setSubmittedEles(mergedFeature);
	}, [selectedEle]);

	return (
		<Stack>
			<Box> 내 채널의 시청자들은 어떠한 다양한 면을 가지고 있을까요? </Box>

			{Object.keys(mergedFeature).map((feature, key) => {
				return (
					<div key={key}>
						<div>{feature}</div>
						{mergedFeature[feature].map((element) => {
							const isDisabled = mergedSelectFeature.includes(element)
								? ""
								: "disabled";
							return (
								<Button
									variant="contained"
									onClick={() => clickEle(feature, element)}
									disabled={isDisabled}
								>
									{element}
								</Button>
							);
						})}
					</div>
				);
			})}
			{/* {submittedEles.map((ele) => {
				return <div> {ele}</div>;
			})} */}
			<Button LinkComponent={Link} to={`/${id}/result`}>
				다음
			</Button>
		</Stack>
	);
};

export default SelectPersona;
