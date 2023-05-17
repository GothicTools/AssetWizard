import React from "react";
import styles from "./Menu.module.scss";

export default function Menu() {
	return (
		<div className={styles.container}>
			<button>File</button>
			<button>Project</button>
			<button>Tools</button>
			<button>Window</button>
			<button>Editor</button>
			<button>Help</button>
		</div>
	);
}