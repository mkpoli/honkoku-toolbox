import "./app.css";
import { mount } from "svelte";

import App from "./App.svelte";
import DisplayTool from "./DisplayTool.svelte";

if (
	window.location.hostname === "ja.wikisource.org" &&
	window.location.pathname.startsWith("/wiki/")
) {
	console.info("[honkoku-toolbox] in Wikisource viewing page");
	const mwContentText: HTMLDivElement | null =
		document.querySelector("#mw-content-text");
	if (mwContentText) {
		// mwContentText.classList.add("honkoku-toolbox");
		mount(DisplayTool, {
			target: mwContentText,
			props: {
				textElement: mwContentText,
			},
		});
	}
}

const app = mount(App, {
	target: (() => {
		const app = document.createElement("div");
		document.body.append(app);
		return app;
	})(),
});

export default app;
