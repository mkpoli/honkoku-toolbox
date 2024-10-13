import { readFileSync } from "node:fs";

import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

const ICON_URL = `data:image/png;base64,${readFileSync("./assets/honkoku.png").toString("base64")}`;

// https://vitejs.dev/config/
export default defineConfig({
	define: {
		__ICON_URL__: JSON.stringify(ICON_URL),
	},
	plugins: [
		svelte(),
		{
			name: "set-headers",
			apply: "serve",
			configureServer(server) {
				server.middlewares.use((_, res, next) => {
					res.setHeader("Access-Control-Allow-Private-Network", "true");
					next();
				});
			},
		},
		monkey({
			entry: "src/main.ts",
			userscript: {
				icon: ICON_URL,
				namespace: "https://mkpo.li/",
				match: [
					"https://honkoku.org/app/",
					"https://ja.wikisource.org/w/index.php?title=*&action=*",
				],
				license: "MIT",
				grant: ["GM.setValue", "GM.getValue"],
				description: "日本の古典籍を翻刻する際の便利ツール",
			},
		}),
	],
	resolve: {
		alias: {
			$lib: "/src/lib",
		},
	},
});
