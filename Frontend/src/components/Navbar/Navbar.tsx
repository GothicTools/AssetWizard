import React from "react";
import styles from "./Navbar.module.scss";
import { Menu, WindowControl } from "..";

export type NavbarProps = {
	onMinimize: () => void;
	onMaximize: () => void;
	onClose: () => void;
}

function AppIcon() {
	return (
		<div className={styles["app-icon"]}>
			<img src={process.env.PUBLIC_URL + "/favicon.ico"} alt="App Icon" />
		</div>
	);
}

export default function Navbar(props: NavbarProps)
{
	return (
		<div className={styles.container}>
			<AppIcon />
			<Menu />
			<div className={styles["control-region"]}></div>
			<WindowControl onMinimize={props.onMinimize} onMaximize={props.onMaximize} onClose={props.onClose}  />
		</div>
	);
}