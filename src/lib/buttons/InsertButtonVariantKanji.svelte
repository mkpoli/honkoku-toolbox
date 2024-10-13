<script lang="ts">
import { getContext, onMount } from "svelte";
import type { Editor } from "$lib/editor";
import tippy, { type Instance as TippyInstance } from "tippy.js";

let {
	display,
	variants,
}: {
	display: string;
	variants: readonly (readonly [display: string, variant: string])[];
} = $props();

let instance: TippyInstance;
let button: HTMLButtonElement;
let variantsContainer: HTMLDivElement;
onMount(() => {
	instance = tippy(button, {
		content: variantsContainer,
		theme: "kana",
		interactive: true,
		offset: [0, 0],
		placement: "auto",
	});
});

const editor = getContext<Editor>("editor");
</script>

<button bind:this={button}>{display}</button>

<div class="variants" bind:this={variantsContainer}>
  {#each variants as [display, variant]}
    <button
      onclick={() => {
        if (editor) {
          editor.insertAtCursor(variant);
        }
        instance.hide();
      }}
      >{display}→{variant}</button
    >
  {/each}
</div>

<style>
  button {
    /* padding: 0.5em 0.1em; */

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
  }

  .variants {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .variants button {
    width: 2em;
  }


  .variants button:hover {
    background-color: #eee;
  }
</style>
