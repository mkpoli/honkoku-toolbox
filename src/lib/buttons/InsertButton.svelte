<script lang="ts">
import { getContext, type Snippet } from "svelte";
import type { Editor } from "$lib/editor.svelte";
import type { Color } from "$lib/color";

let {
	color = "black",
	text,
	display = text instanceof Function ? text("…") : text,
	title,
	children,
	oncontextmenu,
}: {
	color?: Color;
	text: string | ((orig: string) => string);
	display?: string;
	title?: string;
	children?: Snippet<[]>;
	oncontextmenu?: (e: MouseEvent) => void;
} = $props();

const editor = getContext<Editor>("editor");
</script>

<button
  data-color={color}
  title={title}
  onclick={(e) => {
    e.stopPropagation();
    if (editor) {
      if (text instanceof Function) {
        editor.replaceSelection(text);
      } else {
        editor.insertAtCursor(text);
      }
    }
  }}
  {oncontextmenu}
>{display}{@render children?.()}
</button>

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
    font-family: inherit;
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

  [data-color='orange'] {
    color: #ff9500;
  }
</style>
