import React from "react";
import MinimizeIcon from '@mui/icons-material/MinimizeRounded';
import MaximizeIcon from '@mui/icons-material/CropLandscapeRounded';
import CloseIcon from '@mui/icons-material/Close';

import styles from "./WindowControl.module.scss";

type ControlButtonProps = {
	icon: any,
	className?: string,
	onClick?: () => void;
}

type ButtonProps = {
	onClick: () => void;
}

export function ControlButton(props: ControlButtonProps) {
	return (
		<button className={`app-window-control-button ${props.className}`} onClick={props.onClick}>
			<props.icon fontSize="inherit" />
		</button>
	);
}

export function MinimizeButton(props: ButtonProps) {
	return (
		<ControlButton icon={MinimizeIcon} onClick={props.onClick}/>
	);
}

export function MaximizeButton(props: ButtonProps) {
	return (
		<ControlButton icon={MaximizeIcon} onClick={props.onClick}/>
	);
}

export function ExitButton(props: ButtonProps) {
	return (
		<ControlButton icon={CloseIcon} className="app-exit-button" onClick={props.onClick}/>
	);
}

type WindowControlProps = {
	onClose: () => void;
}

export default function WindowControl(props: WindowControlProps) {
	return (
		<div className={styles.container}>
			<MinimizeButton onClick={props.onClose}/>
			<MaximizeButton onClick={props.onClose}/>
			<ExitButton onClick={props.onClose}/>
		</div>
	);
}