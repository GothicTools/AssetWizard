import React from "react";
import styles from "./Navbar.module.scss";
import { Menu, WindowControl } from "..";

export type NavbarProps = {
	onClose: () => void;
	onMaximize: () => void;
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
	type DragEvent = React.DragEvent<HTMLDivElement>;

	const handleDoubleClick = (event: React.MouseEvent) => {
		if (event.target !== event.currentTarget) {
			return;
		}

		props.onMaximize();
	}
	;
	const handleDrag = (event: DragEvent) => {
		if (event.target !== event.currentTarget) {
			return;
		}

		props.onMaximize();
	};

	const handleMouseDown = (event: React.MouseEvent) => {
		if (event.target !== event.currentTarget) {
			return;
		}

		props.onMaximize();
	};

	return (
		<div className={styles.container} onMouseDown={handleMouseDown}>
			<AppIcon />
			<Menu />
			<div className={styles["control-region"]}></div>
			<WindowControl onClose={props.onClose} />
		</div>
	);
}