import getWebviewApi from "../webviewApi";
import getBounds from "../ui/getBounds";

export function reportGameViewportBounds(element: HTMLElement, width: number, height: number) {
	const bounds = getBounds(element);
	const message = {
		type: "event",
		name: "gameViewportBounds",
		bounds: {
			left: bounds.left,
			top: bounds.top,
			right: bounds.left + (width * window.devicePixelRatio),
			bottom: bounds.top + (height * window.devicePixelRatio),
		},
	};
	console.log("Reporting bounds: ", message.bounds);
	getWebviewApi()?.postMessage(message);
}

export function reportGameFocus() {
	const webview = getWebviewApi();
	if (!webview) {
		return;
	}

	const message = {
		type: "event",
		name: "gameViewportFocused",
	};

	webview.postMessage(message);
}