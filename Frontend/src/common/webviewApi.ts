declare global {
	interface Window {
		chrome: any,
	}
}

export function hasWebviewApi(): boolean {
	return !!getWebviewApi();
}

export default function getWebviewApi(): any {
	return window.chrome?.webview;
}
