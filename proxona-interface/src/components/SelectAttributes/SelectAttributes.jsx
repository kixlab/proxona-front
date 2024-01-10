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
import { features } from "../../data/dummy";

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
		>
			{attributes.map((attr) => (
				<Tooltip
					title={
						attr.split("-").length - 1 == 1 && attr.includes("-")
							? attr.slice(attr.indexOf("-") + 1)
							: attr
					}
					key={attr}
				>
					{/* <span> */}
					<ToggleButton value={attr} disabled={readonly}>
						#
						{attr.includes(")")
							? attr.slice(0, attr.indexOf(")") + 1)
							: attr.includes("-")
							? attr.slice(0, attr.indexOf("-"))
							: attr}
					</ToggleButton>
					{/* </span> */}
				</Tooltip>
			))}
		</ToggleButtonGroup>
	);
};

const AddValueDialog = ({ dimension, open, handleClose, handleAdd }) => {
	const [value, setValue] = useState("");

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
						handleAdd(dimension, value);
						setValue("");
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
	}, [initValues]);

	return (
		<Stack spacing={2}>
			{Object.entries(dimensions).map(([dimension, values]) => {
				return (
					<Stack key={dimension} spacing={1}>
						<Typography>{dimension}</Typography>
						<Stack
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
									<Button color="primary" variant="contained" size="small">
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
