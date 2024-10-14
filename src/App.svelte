<script lang="ts">
import type { Editor } from "$lib/editor.svelte";
import { CodeMirrorEditor, KojiEditor } from "$lib/editor.svelte";
import VariantKana from "$lib/VariantKana.svelte";
import VariantKanji from "$lib/VariantKanji.svelte";
import FloatMenu from "./lib/MainMenu.svelte";

const url = new URL(window.location.href);

const platform: Platform | undefined = (() => {
	if (url.host.includes("honkoku.org")) return "honkoku";
	if (url.host.includes("wikisource.org")) return "wikisource";
	return undefined;
})();
console.info("[honkoku-toolbox] platform: ", platform);

let editor: Editor | undefined = $state(undefined);
$inspect("editor", editor);

// const editor: Editor | undefined = (() => {
//   if (platform === 'honkoku') return new TextAreaEditor();
//   if (platform === 'wikisource') return new WikisourceEditor(new CodeMirror.Editor());
//   return undefined;
// })();

const MAX_RETRIES = 10;
setTimeout(() => {
	if (!platform) {
		throw new Error("[honkoku-toolbox] Unsupported platform");
	}

	if (platform === "honkoku") {
		let kojiWrapper: HTMLDivElement | undefined;

		const wrappers = document.getElementsByClassName("editor-wrapper");
		if (wrappers.length > 0) {
			kojiWrapper = wrappers[0] as HTMLDivElement;
		}
		if (!kojiWrapper) {
			let retries = 0;
			const interval = setInterval(() => {
				const wrappers = document.getElementsByClassName("editor-wrapper");
				if (wrappers.length > 0) {
					kojiWrapper = wrappers[0] as HTMLDivElement;
					editor = new KojiEditor(kojiWrapper);
					clearInterval(interval);
				}
				if (retries > MAX_RETRIES) {
					clearInterval(interval);
				}
				retries++;
			}, 500);
		} else {
			editor = new KojiEditor(kojiWrapper);
		}
		return;
	}

	if (platform === "wikisource") {
		let cm: CodeMirror.Editor | undefined;
		const codeMirrorDivs = document.getElementsByClassName("CodeMirror");
		if (codeMirrorDivs.length > 0) {
			const codeMirror = codeMirrorDivs[0] as HTMLDivElement & {
				CodeMirror: CodeMirror.Editor;
			};
			cm = codeMirror.CodeMirror;
			editor = new CodeMirrorEditor(cm);
		} else {
			let retries = 0;
			const interval = setInterval(() => {
				const codeMirrorDivs = document.getElementsByClassName("CodeMirror");
				if (codeMirrorDivs.length > 0) {
					const codeMirror = codeMirrorDivs[0] as HTMLDivElement & {
						CodeMirror: CodeMirror.Editor;
					};
					cm = codeMirror.CodeMirror;
					editor = new CodeMirrorEditor(cm);
					clearInterval(interval);
				}
			}, 500);
		}
		// const areas = document.getElementsByClassName('mw-editfont-monospace');
		// if (areas.length > 0) {
		//   textArea = areas[0] as HTMLTextAreaElement;
		// }
	}
}, 500);
</script>

{#if editor && platform}
	<VariantKana {editor} />
	<FloatMenu {editor} {platform}/>
	<VariantKanji {editor} />
{/if}
