import React, { useState, useEffect, useCallback, useMemo } from "react";
import { features2 } from "../data/dummy";
import { Stack, Button, Box } from "@mui/material";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import "./styles/index.css";
import SelectAttributes from "../components/SelectAttributes/SelectAttributes";

const SelectPersona = () => {
	return <SelectAttributes></SelectAttributes>;
};

export default SelectPersona;
