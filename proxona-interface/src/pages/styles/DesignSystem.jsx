import styled, { css } from "styled-components";

//mainButton
export const MainButton = styled.input`
	background-color: #6d53d3;
	border-radius: 10px;
	padding: 10px 20px;
	border: none;
	width: 80px;
	color: white;
`;

//button

export const PrimButton = styled.button`
	margin-top: 30px;
	background-color: #6d53d3;
	padding: 10px;
	padding-left: 20px;
	padding-right: 20px;
	border-radius: 10px;
	border: none;
	color: white;
`;

export const CloseButton = styled.button`
	color: white;
	background-color: transparent;
	background-repeat: no-repeat;
	border: none;
	cursor: pointer;
	overflow: hidden;
	outline: none;
`;

//modal wrapper
export const ModalWrapper = styled.div`
	background-color: #555;
	opacity: 90%;
	height: 100%;
	width: 100%;
	color: white;
	z-index: 100;
	position: fixed;
	bottom: 0;
	right: 0;
	cursor: pointer;
	text-wrap: wrap;
	display: flex;
`;

export const InputWrapper = styled.input`
	position: fixed;
	bottom: 0;
	padding: 1rem 0.3rem 2rem 0.3rem;
	margin: auto;
`;
