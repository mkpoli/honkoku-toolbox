<script lang="ts">
import { getContext } from "svelte";
import type { Editor } from "./utils";

let {
	color = "black",
	text,
	display = text instanceof Function ? text("…") : text,
}: {
	color?: Color;
	text: string | ((orig: string) => string);
	display?: string;
} = $props();

const editor = getContext<Editor>("editor");
</script>

<button
  data-color={color}
  onclick={() => {
    if (editor) {
      if (text instanceof Function) {
        editor.replaceSelection(text);
      } else {
        editor.insertAtCursor(text);
      }
    }
  }}>{display}</button
>

<style>
  button {
    padding: 0.5em 0.1em;
    border: 1px solid #bbb;
    background-color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
  }

  button:hover {
    background-color: #eee;
  }

  [data-color='black'] {
    color: black;
  }

  [data-color='green'] {
    color: #00a800;
  }

  [data-color='blue'] {
    color: #009dff;
  }

  [data-color='red'] {
    color: #ff3e00;
  }

  [data-color='pink'] {
    color: #ff00dd;
  }

  [data-color='gray'] {
    color: #888888;
  }
</style>
