import React, { useEffect, useState } from 'react';
import './FloatingMenu.css';
import { Stack, Button, ButtonGroup } from "@mui/material";
import { dummy } from '../../data/dummy';

export const FloatingMenu = ({ show }) => {

	const ACTIONS = {
		"append": "APPEND",
		"switch": "SWITCH"
	}

	const [action, setAction] = useState('')
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = (action) => {
		setAction(action)
		setIsOpen(!isOpen);
	};

	const handleAction = proxona => {
		if (Object.values(ACTIONS).indexOf(action) === -1) {
			console.warn('no action was selected')
		}

		/**
		 * logic here
		 */

		window.getSelection().removeAllRanges();
	}

	useEffect(() => {
		setIsOpen(false)
		setAction('')
	} ,[show])

	return (
		<div className="floating-menu-container">
			{!isOpen ? (
				<Stack direction={"row"}>
				{Object.entries(ACTIONS).map(([k, v]) => (
					<Button size='small' variant='contained' onClick={() => toggleMenu(v)} className="floating-menu-toggle">
						{k}
					</Button>
				))}
			</Stack>
			) : (
				<ButtonGroup size='small' variant="contained">
					{dummy.map(proxona => (
						<Button 
							key={proxona.index}
							onClick={() => handleAction(proxona)}
						>{proxona.username}</Button>
					))}
					
				</ButtonGroup>
			)}
			


			{/* {isOpen && (
				<div className="floating-menu-content">
					<ul>
						<li>Eun Jeong</li>
						<li>Juho</li>
						<li>Min</li>
						<li>Yoonseo</li>
						<li>Seulgi</li>
					</ul>
				</div>
			)} */}
		</div>
	);
};

// export default FloatingMenu;
