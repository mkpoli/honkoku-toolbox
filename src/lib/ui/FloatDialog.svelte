<script lang="ts">
import { draggable } from "@neodrag/svelte";
import type { Snippet } from "svelte";

let {
	children,
	shown = $bindable(false),
}: { children: Snippet<[]>; shown?: boolean } = $props();
</script> 

<div class="float-menu" use:draggable={{ bounds: 'body' }} role="dialog" title="ドラッグして移動、ダブルクリックして隠す" ondblclick={() => (shown = false)}>
  {@render children()}
</div>

<style>
  .float-menu {
    writing-mode: vertical-rl;

    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fbfbfb;
    z-index: 100;
    padding: 0.5em;
    gap: 0.5em;

    font-size: 0.85rem;

    border-radius: 0.5em;

    box-shadow: 4px 4px 1em #00000033;

    display: grid;
    grid-template-columns: auto 1fr;

    user-select: none;

		cursor: move;
  }
</style>
