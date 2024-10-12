<script lang="ts">
  import FloatMenu from './lib/FloatMenu.svelte';
  let textArea: HTMLTextAreaElement | undefined;

  const MAX_RETRIES = 10;
  setTimeout(() => {
    const areas = document.getElementsByClassName('koji-editor-textarea');
    if (areas.length > 0) {
      textArea = areas[0] as HTMLTextAreaElement;
      console.log('textArea', textArea);
    }
    if (!textArea) {
      let retries = 0;
      const interval = setInterval(() => {
        const areas = document.getElementsByClassName('koji-editor-textarea');
        if (areas.length > 0) {
          textArea = areas[0] as HTMLTextAreaElement;
          clearInterval(interval);
        }
        if (retries > MAX_RETRIES) {
          clearInterval(interval);
        }
        retries++;
      }, 500);
    }
  }, 500);
</script>

{#if textArea}
  <FloatMenu {textArea} />
{/if}
