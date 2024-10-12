<script lang="ts">
  import { getContext } from 'svelte';
  import { insertAtCursor, repalceSelection } from './utils';

  type Color = 'black' | 'green' | 'blue' | 'red' | 'pink' | 'gray';

  export let color: Color = 'black';
  export let text: string | ((orig: string) => string);
  export let display: string = text instanceof Function ? text('…') : text;
  const textArea = getContext<HTMLTextAreaElement>('textArea');
  console.log('textArea', textArea);
</script>

<button
  data-color={color}
  on:click={() => {
    if (textArea) {
      if (text instanceof Function) {
        repalceSelection(textArea, text);
      } else {
        insertAtCursor(textArea, text);
      }
    }
  }}>{display}</button
>

<style>
  button {
    padding: 0.5em 0.1em;
    border-radius: 0.5em;
    border: 1px solid #ccc;
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
