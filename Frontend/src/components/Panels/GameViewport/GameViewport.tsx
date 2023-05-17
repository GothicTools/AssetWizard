import React from "react";

import { IDockviewPanelProps } from "dockview";
import { reportGameFocus } from "../../../common/messaging/events";

import "./GameViewport.scss";

type GameViewportProps = {
	title: string,
};
type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

export default function GameViewport(props: IDockviewPanelProps<GameViewportProps>) {

	const handleClick = (ev: ClickEvent) => {
		if (ev.button !== 0) {
			return;
		}
		reportGameFocus();
	};

	return (
		<div onClick={handleClick} className="editor-game-viewport-window" id="GAME_VIEWPORT">
			<p className="panel-identifier">
				{props.params.title}<br/>
				(Inactive)
			</p>
			<section className="focus-hint">
				<span>Click the game window to enter the game.</span>
			</section>
		</div>
	);
}