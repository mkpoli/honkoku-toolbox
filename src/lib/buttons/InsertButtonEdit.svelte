<script lang="ts">
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

let textValue: string = $state(text);
let displayValue: string = $state(display);
let colorValue: Color = $state(color);
</script>

<input type="text" bind:value={textValue} title="入力文字（必須、空欄で削除）" />
<input type="text" bind:value={displayValue} title="表示文字" />
<select bind:value={colorValue} title="文字色">
  <option value="black">black</option>
  <option value="green">green</option>
  <option value="blue">blue</option>
  <option value="red">red</option>
  <option value="pink">pink</option>
  <option value="gray">gray</option>
</select>

<button onclick={() => {
  if (textValue) {
    onedit?.(colorValue, textValue, displayValue);
    editing = false;
  } else {
    ondelete?.();
  }
}}>OK</button>

<style>
  input[type="text"] {
    height: 3em;
  }
  
  select {
    height: 3em;
  }
</style>