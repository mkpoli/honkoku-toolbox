<script lang="ts">
import type { Editor } from "$lib/editor.svelte";
import { setContext } from "svelte";
import FloatDialog from "$lib/ui/FloatDialog.svelte";
import InsertButton from "$lib/buttons/InsertButton.svelte";
import { GROUPED_VARIANTS } from "$lib/kanji";
let { editor }: { editor: Editor } = $props();
setContext("editor", editor);
import InsertButtonVariantKanji from "./buttons/InsertButtonVariantKanji.svelte";
import type { Color } from "$lib/color";

let shown = $state(false);

const VARIANTS: { traditional: string; simplified: string; color: Color }[] = [
	{ traditional: "敎", simplified: "教", color: "blue" },
	{ traditional: "內", simplified: "内", color: "pink" },
];

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

let highlight = $state(false);
$effect(() => {
	editor.toggleClass("display-variant-highlight", highlight);
});
</script> 

{#if shown}
	<FloatDialog bind:shown>
		<div class="container">
			<h2>異體漢字</h2>
			<label >
				<input type="checkbox" bind:checked={highlight} name="highlight"  />
				<span>異體字をハイライト</span>
			</label>
			<div class="panel">
				{#each VARIANTS as {traditional, simplified, color}}
					<InsertButton color={color} text={traditional} display={`${traditional}=${simplified}`} />
				{/each}
				{#each Object.entries(GROUPED_VARIANTS) as [key, variants]}
					<InsertButtonVariantKanji display={key} variants={variants} />
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