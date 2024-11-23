<script lang="ts">
import { onMount } from "svelte";

let writingMode: "vertical-rl" | "vertical-lr" | "horizontal-tb" =
	$state("horizontal-tb");
let { textElement } = $props<{ textElement: HTMLDivElement }>();

let pageContent: HTMLDivElement =
	document.querySelector(".prp-page-content") || textElement;

let pageImage: HTMLDivElement =
	document.querySelector(".prp-page-image") || textElement;

onMount(() => {
	pageContent.style.setProperty("resize", "both");
	pageContent.style.setProperty("overflow", "auto");
});

$effect(() => {
	if (writingMode === "horizontal-tb") {
		pageContent.style.setProperty("height", "100%");
	} else {
		pageContent.style.setProperty("height", `${pageImage.clientHeight}px`);
	}
	pageContent.style.setProperty("writing-mode", writingMode);
});
</script>

<fieldset>
	<select bind:value={writingMode}>
		<option value="horizontal-tb">横書き</option>
		<option value="vertical-rl">縦書き</option>
		<option value="vertical-lr">縦書き左回り</option>
	</select>
</fieldset>

<style>
  fieldset {
    padding: 1.5em 2em;
  }
</style>