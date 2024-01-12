import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
	Stack,
	Tooltip,
	Button,
	Typography,
	ToggleButtonGroup,
	ToggleButton,
	Dialog,
	TextField,
	DialogActions,
	DialogContent,
} from "@mui/material";
import "../../pages/styles/index.css";
import axios from "axios";
import { port } from "../../data/port";
import { useDispatch, useSelector } from "react-redux";
import { addAttribute } from "../../redux/attributeList.js";
import { useParams } from "react-router-dom";

// function CustomToggleButton(props) {
// 	return <ToggleButton {...props} />;
// }

const DimensionToggleGroup = ({
	attributes,
	attribute,
	onChange,
	readonly,
}) => {
	const handleChange = (event, newAttribute) => {
		onChange(newAttribute);
	};
	return (
		<ToggleButtonGroup
			value={attribute?.value}
			exclusive
			onChange={handleChange}
			// fullWidth="true"
			size="small"
		>
			{attributes.map((attr) => (
				<ToggleButton value={attr} disabled={readonly}>
					#
					{attr.includes(")")
						? attr.slice(0, attr.indexOf(")") + 1)
						: attr.includes("-")
						? attr.slice(0, attr.indexOf("-"))
						: attr}
					<Tooltip
						title={
							attr.split("-").length - 1 == 1 && attr.includes("-")
								? attr.slice(attr.indexOf("-") + 1)
								: attr
						}
						key={attr}
					/>
				</ToggleButton>
			))}
		</ToggleButtonGroup>
	);
};

const AddValueDialog = ({ dimension, open, handleClose, handleAdd }) => {
	const [value, setValue] = useState("");
	// const attributeList = useSelector((state) => state.attributeList.attributes);
	// const dispatch = useDispatch();
	const { id } = useParams();

	const addNewAtt = async () => {
		try {
			await axios.post(
				port + `youtube_api/${id}/add-new-value/`,
				{
					dimension: dimension,
					value,
				}
			);

			handleAdd(dimension, value);
			setValue("");
						
		} catch (error) {
			console.error("Error submitting form", error);
		}
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogContent p={2}>
				<Typography gutterBottom>
					<b style={{ textDecoration: "underline" }}>{dimension}</b>에 추가할
					특성을 적어보세요.
				</Typography>
				<TextField
					value={value}
					onChange={(event) => {
						setValue(event.target.value);
					}}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>닫기</Button>
				<Button
					variant="contained"
					disabled={value.length === 0}
					onClick={() => {
						addNewAtt();
						handleClose();
					}}
				>
					추가하기
				</Button>
			</DialogActions>
		</Dialog>
	);
};

const SelectAttributes = ({
	attributes,
	initValues,
	onSelect,
	readonly = false,
	extendable = false,
}) => {
	const [dimensions, setDimensions] = useState(
		Object.fromEntries(
			Object.entries(attributes).map(([dimension, values]) => {
				return [
					dimension,
					values.map((value) => ({
						value,
						selected: initValues ? initValues[dimension] === value : false,
					})),
				];
			})
		)
	);
	const [targetDimension, setTargetDimension] = useState("");
	const [addValueDialogOpen, setAddValueDialogOpen] = useState(false);

	const addValues = (dimension, value) => {
		setDimensions({
			...dimensions,
			[dimension]: [
				...dimensions[dimension].map(({ value }) => ({
					value,
					selected: false,
				})),
				{ value, selected: true },
			],
		});
	};

	const handleAddValueDialogClose = () => {
		setAddValueDialogOpen(false);
	};

	const handleSuggest = () => {
		// axios.get("");
	};

	useEffect(() => {
		setDimensions(
			Object.fromEntries(
				Object.entries(attributes).map(([dimension, values]) => {
					return [
						dimension,
						values.map((value) => ({
							value,
							selected: initValues ? initValues[dimension] === value : false,
						})),
					];
				})
			)
		);
	}, [initValues, attributes]);

	return (
		<Stack spacing={5}>
			{Object.entries(dimensions).map(([dimension, values]) => {
				return (
					<Stack key={dimension} spacing={1}>
						<Typography>{dimension}</Typography>
						<Stack
							sx={{ width: "100%" }}
							direction={"row"}
							spacing={2}
							justifyContent={"space-between"}
						>
							<DimensionToggleGroup
								attributes={values.map(({ value }) => value)}
								attribute={values.filter(({ selected }) => selected)[0]}
								readonly={readonly}
								onChange={(newAttribute) => {
									const nextDim = {
										...dimensions,
										[dimension]: dimensions[dimension].map(({ value }) => ({
											value,
											selected: value === newAttribute,
										})),
									};
									setDimensions(nextDim);
									onSelect(nextDim);
								}}
							/>
							{extendable && (
								<Stack spacing={0.5} direction={"row"} alignSelf={"center"}>
									<Button
										color="primary"
										variant="contained"
										size="small"
										onClick={() => handleSuggest()}
									>
										제안받기
									</Button>
									<Button
										color="primary"
										variant="contained"
										size="small"
										onClick={() => {
											setTargetDimension(dimension);
											setAddValueDialogOpen(true);
										}}
									>
										직접추가
									</Button>
								</Stack>
							)}
						</Stack>
					</Stack>
				);
			})}
			<AddValueDialog
				open={addValueDialogOpen}
				dimension={targetDimension}
				handleClose={handleAddValueDialogClose}
				handleAdd={addValues}
			/>
		</Stack>
	);
};

export default SelectAttributes;
