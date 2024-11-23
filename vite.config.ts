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
					"https://honkoku.org/app/*",
					// "https://ja.wikisource.org/w/index.php?title=*&action=*",
					"https://ja.wikisource.org/*",
				],
				license: "MIT",
				grant: ["GM.setValue", "GM.getValue"],
				description: {
					en: "Convenient tools for transcribing Japanese classical texts",
					ja: "日本の古典籍をデジタル翻刻する際の便利ツール",
					zh: "日本古籍數字化翻印用的便利工具集成",
					ko: "日本古典文獻을 디지털化할 때 便利한 道具",
				},
				name: {
					en: "Honkoku Tools",
					ja: "翻刻ツールボックス",
					zh: "翻刻工具箱",
					ko: "翻刻道具箱子",
				},
			},
		}),
	],
	resolve: {
		alias: {
			$lib: "/src/lib",
		},
	},
});
