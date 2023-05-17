import React from "react";

import { IDockviewPanelProps } from "dockview";

type AssetBrowserProps = {
	title: string,
};

function makeEventHandler(target: any, name: string, handler: (event: any) => void) {
	return () => {
		target.addEventListener(name, handler);
		return () => {
			target.removeEventListener(name, handler);
		};
	};
}

function pointInsideWindow(x: number, y: number): boolean {
	return y > 0 && x > 0 && x < window.innerWidth && y < window.innerHeight;
}

export default function AssetBrowser(props: IDockviewPanelProps<AssetBrowserProps>) {

	const [myColor, setMyColor] = React.useState("gray");

	const handleDragEnter = (event: DragEvent) => {
		setMyColor("red");
	};
	const handleMouseLeave = (event: DragEvent) => {
		if (pointInsideWindow(event.clientX, event.clientY)) {
			return;
		}
		setMyColor("gray");
	};


	React.useEffect(makeEventHandler(window, "dragenter", handleDragEnter), [myColor]);
	React.useEffect(makeEventHandler(window, "dragleave", handleMouseLeave), [myColor]);

	return (
		<div style={{ minWidth: "100%", minHeight: "100%", backgroundColor: myColor }}>
			{props.params.title}
		</div>
	);
}