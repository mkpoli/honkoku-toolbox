<script lang="ts">
import { getContext, onMount } from "svelte";
import type { Editor } from "$lib/editor.svelte";
import tippy, { type Instance as TippyInstance } from "tippy.js";
let {
	display,
	variants,
}: {
	display: string;
	variants: readonly string[];
} = $props();

let currentVariant: string = $state("");

let instance: TippyInstance;
let button: HTMLButtonElement;
let variantsContainer: HTMLDivElement;
let active = $state(false);
onMount(() => {
	instance = tippy(button, {
		content: variantsContainer,
		theme: "kana",
		interactive: true,
		offset: [0, 0],
		placement: "right",
		onShow: () => {
			active = true;
		},
		onHide: () => {
			active = false;
		},
	});
});

const editor = getContext<Editor>("editor");
</script>

<button bind:this={button} class:active onclick={() => {
  editor?.insertAtCursor(display);
}}>{display}</button>

<div class="variants" bind:this={variantsContainer}>
  {#each variants as variant}
    <button
      onclick={() => {
        if (editor) {
          editor.insertAtCursor(variant);
        }
        instance.hide();
      }}
      >{variant}</button
    >
  {/each}
</div>

<style>
  button {
    /* padding: 0.5em 0.1em; */
    width: 2em;
    height: 2em;
    border: 1px solid #bbb;
    background-color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;

    background-color: #ffffff85;
    backdrop-filter: blur(10px);
  }

  button:hover {
    background-color: #eee;
    border-color: #000;
  }

  button.active {
    background-color: #eee;
  }

  .variants {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .variants button {
    font-family: 'Noto Serif Hentaigana', 'UniHentaiKana', serif;
    border-radius: 2em;
    box-shadow: 0 0 5px 1px #bbb;
  }

  .variants button:hover {
    background-color: #eee;
  }
</style>
