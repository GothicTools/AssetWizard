export default function getBounds(domElement: HTMLElement) {
	const r = domElement.getBoundingClientRect();
	const pr = window.devicePixelRatio;
	return {
		left: Math.round(r.left * pr),
		top: Math.round(r.top * pr),
		right: Math.round(r.right * pr),
		bottom: Math.round(r.bottom * pr),
	};
}
