<script lang="ts">
import { getContext, onMount } from "svelte";
import type { Editor } from "$lib/editor.svelte";
import tippy, { type Instance as TippyInstance } from "tippy.js";

let {
	display,
	variants,
	selection,
}: {
	display: string;
	variants: readonly (readonly [display: string, variant: string | null])[];
	selection: string;
} = $props();

let instance: TippyInstance | undefined;
let button: HTMLButtonElement;
let variantsContainer: HTMLDivElement;
let active = $state(false);
onMount(() => {
	instance = tippy(button, {
		content: variantsContainer,
		theme: "kana",
		interactive: true,
		offset: [0, 0],
		placement: "auto",
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

<button bind:this={button} class="type" class:active class:selected={variants.some(([display, _v]) => selection.includes(display))}>{display}</button>

<div class="variants" bind:this={variantsContainer}>
  {#each variants as [display, variant]}
    {#if variant}
      <button
        class:selected={selection.includes(display)}
        onclick={() => {
        if (editor) {
          editor.insertAtCursor(variant);
        }
        instance?.hide();
      }}
      >{display}→{variant}</button
    >
    {/if}
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

    font-family: 'Jigmo', 'Jigmo2', 'Jigmo3', 'HanaMinA', 'HanaMinB', serif;
  }

  button:hover {
    background-color: #eee;
    border-color: #000;
  }

  button.active {
    background-color: #eee;
  }

  button.selected {
    background-color: #fff0cc;
  }

  .type.selected {
    border-color: #765300;
  }


  .variants {
    display: flex;
    flex-direction: column;
    gap: 0;
    box-shadow: 0 0 5px 1px #bbb;
  }

  .variants button {
    width: 2em;
  }


  .variants button:hover {
    background-color: #eee;
  }
</style>
