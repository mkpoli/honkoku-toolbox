<script lang="ts">
import { KojiEditor, type Editor } from "$lib/editor.svelte";
import { setContext } from "svelte";
import FloatDialog from "$lib/ui/FloatDialog.svelte";
import InsertButton from "$lib/buttons/InsertButton.svelte";
import { GROUPED_VARIANTS } from "$lib/kanji";
let { editor }: { editor: Editor } = $props();
setContext("editor", editor);
import InsertButtonVariantKanji from "./buttons/InsertButtonVariantKanji.svelte";
import type { Color } from "$lib/color";
import { preferences } from "./preferences.svelte";

let shown = $state(false);

const VARIANTS: { traditional: string; simplified: string; color: Color }[] = [
	{ traditional: "敎", simplified: "教", color: "blue" },
	{ traditional: "內", simplified: "内", color: "pink" },
];

/**
 * Input mode for variant kanji
 *
 * - compatibility-only: only use compatibility kanji (for honkoku.org which does not support variant selector), variant selector is not shown
 * - variant-selector-only: only use variant selector (for honkoku.org which does not support compatibility kanji), compatibility kanji is not shown
 * - compatibility-first: show compatibility kanji first, then variant selector
 * - case-by-case: let user select compatibility or variant selector case by case
 *
 * Because every compatibility kanji has a variant selector counterpart, it will
 */
let inputMode = $state<
	"compatibility-only" | "variant-selector-only" | "compatibility-first"
	// | "case-by-case"
>(
	editor instanceof KojiEditor
		? "compatibility-first"
		: "variant-selector-only",
);

function selectVariant(
	compatibility: string | null,
	variantSelector: string | null,
) {
	switch (inputMode) {
		case "compatibility-only":
			return compatibility || null;
		case "variant-selector-only":
			return variantSelector || null;
		case "compatibility-first":
			return compatibility || variantSelector;
		// case "case-by-case":
		// 	return;
	}
}

$effect(() => {
	for (const { simplified } of VARIANTS) {
		if (editor.segments.includes(simplified)) {
			editor.markText(simplified);
		}
	}

	for (const [_key, variants] of Object.entries(GROUPED_VARIANTS)) {
		for (const [display, _variant] of variants) {
			if (editor.segments.includes(display)) {
				editor.markText(display);
			}
		}
	}
});
$effect(() => {
	editor.toggleClass("display-variant-highlight", preferences.highlight);
});
</script> 

{#if shown}
	<FloatDialog bind:shown>
		<div class="container">
			<h2>異體漢字</h2>
			<label >
				<input type="checkbox" bind:checked={preferences.highlight} name="highlight"  />
				<span>異體字をハイライト</span>
			</label>
			<select bind:value={inputMode}>
				<option value="variant-selector-only">異体字セレクタのみ</option>
				<option value="compatibility-only">CJK互換漢字のみ</option>
				<option value="compatibility-first">CJK互換漢字優先</option>
			</select>
			<div class="panel">
				{#each VARIANTS as {traditional, simplified, color}}
					<InsertButton color={color} text={traditional} display={`${traditional}=${simplified}`} />
				{/each}
				{#each Object.entries(GROUPED_VARIANTS) as [key, variants]}
					<InsertButtonVariantKanji display={key} variants={variants.map(([display, [compatibility, variantSelector]]) => ([display, selectVariant(compatibility, variantSelector)]))} selection={editor.selectedText} />
				{/each}
			</div>
		</div>
	</FloatDialog>
{:else}
  <button class="show-button" onclick={() => (shown = true)} title="變體假名パネルを開く">
    <div class="icon">異</div>
  </button>
{/if}

<style>
	h2 {
		margin: 0;
		border: none;
		font-size: 1.25em;
		font-family: inherit;
		width: 100%;
		text-align: center;
		font-weight: bold;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 0.25em;
		align-items: stretch;
		justify-content: center;
		font-family: 'Noto Serif Hentaigana', 'UniHentaiKana', serif;
	}

	.show-button {
    position: fixed;
    right: 0;
    top: 60%;
    height: 3rem;
    transform: translateY(-50%);
    background-color: #fff;
    padding: 0.5em;
    border-radius: 0.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 1em #00000033;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    transition: transform 0.1s ease-in-out;
    border: 1px solid #ccc;
		font-family: serif;
		color: #0f03f8;
  }

  .show-button:hover {
    transform: translateY(-50%) scale(1.1);
  }

	.icon {
		font-size: 2em;
	}

	.panel {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 0.25em;
		max-width: 20em;
	}

	label {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5em;
	}
</style>