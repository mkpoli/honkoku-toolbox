<script lang="ts">
import InsertButton from "./InsertButton.svelte";
import InsertButtonEdit from "./InsertButtonEdit.svelte";
import type { Color } from "$lib/color";

let {
	color = "black",
	text,
	display = text,
	onedit,
	ondelete,
}: {
	color?: Color;
	text: string;
	display?: string;
	onedit?: (color: Color, text: string, display?: string) => void;
	ondelete?: () => void;
} = $props();

let editing = $state(false);
let textValue = $state(text);
</script>

{#if editing}
  <InsertButtonEdit
    color={color}
    text={text}
    display={display}
    onedit={(color, text, display) => {
      onedit?.(color, text, display);
      editing = false;
    }}
    ondelete={() => {
      ondelete?.();
      editing = false;
    }}
  />
{:else}
	<InsertButton color={color} text={text} display={display} oncontextmenu={(e) => {
      e.preventDefault();
      editing = true;
    }} />
{/if}
