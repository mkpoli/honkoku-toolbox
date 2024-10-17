<script lang="ts">
import type { Editor } from "$lib/editor.svelte";
import { setContext } from "svelte";
import KanaButton from "$lib/buttons/KanaButton.svelte";
import FloatDialog from "$lib/ui/FloatDialog.svelte";
import InsertButton from "$lib/buttons/InsertButton.svelte";

let { editor }: { editor: Editor } = $props();
setContext("editor", editor);

let shown = $state(false);

const KANA_TABLE = [
	["あ", ["𛀂", "𛀅", "𛀃", "𛀄"]],
	["い", ["𛀆", "𛀇", "𛀈", "𛀉"]],
	["う", ["𛀊", "𛀋", "𛀌", "𛀍", "𛀎"]],
	["え", ["𛀁", "𛀏", "𛀐", "𛀑", "𛀒", "𛀓"]],
	["お", ["𛀔", "𛀕", "𛀖"]],
	[
		"か",
		["𛀗", "𛀘", "𛀙", "𛀚", "𛀛", "𛀢", "𛀜", "𛀝", "𛀞", "𛀟", "𛀠", "𛀡"],
	],
	["き", ["𛀣", "𛀤", "𛀥", "𛀦", "𛀻", "𛀧", "𛀨", "𛀩", "𛀪"]],
	["く", ["𛀫", "𛀬", "𛀭", "𛀮", "𛀯", "𛀰", "𛀱"]],
	["け", ["𛀳", "𛀲", "𛀢", "𛀴", "𛀵", "𛀶", "𛀷"]],
	["こ", ["𛀸", "𛂘", "𛀹", "𛀻", "𛀺"]],
	["さ", ["𛀼", "𛀽", "𛀾", "𛀿", "𛁀", "𛁁", "𛁂", "𛁃"]],
	["し", ["𛁄", "𛁅", "𛁆", "𛁇", "𛁈", "𛁉"]],
	["す", ["𛁊", "𛁋", "𛁌", "𛁍", "𛁎", "𛁏", "𛁐", "𛁑"]],
	["せ", ["𛁒", "𛁓", "𛁔", "𛁕", "𛁖"]],
	["そ", ["𛁗", "𛁘", "𛁙", "𛁚", "𛁛", "𛁜", "𛁝"]],
	["た", ["𛁞", "𛁟", "𛁠", "𛁡"]],
	["ち", ["𛁢", "𛁣", "𛁤", "𛁥", "𛁦", "𛁧", "𛁨"]],
	["つ", ["𛁩", "𛁪", "𛁫", "𛁬", "𛁭"]],
	["て", ["𛁮", "𛁯", "𛁰", "𛁱", "𛁲", "𛁳", "𛁴", "𛁵", "𛁶", "𛂎"]],
	["と", ["𛁷", "𛁸", "𛁹", "𛁺", "𛁻", "𛁼", "𛁽", "𛁭"]],
	["な", ["𛁾", "𛁿", "𛂀", "𛂁", "𛂂", "𛂃", "𛂄", "𛂅", "𛂆"]],
	["に", ["𛂇", "𛂈", "𛂉", "𛂊", "𛂋", "𛂌", "𛂍", "𛂎"]],
	["ぬ", ["𛂏", "𛂐", "𛂑"]],
	["ね", ["𛂒", "𛂓", "𛂔", "𛂕", "𛂖", "𛂗", "𛂘"]],
	["の", ["𛂙", "𛂚", "𛂛", "𛂜", "𛂝"]],
	["は", ["𛂞", "𛂟", "𛂠", "𛂡", "𛂢", "𛂣", "𛂤", "𛂥", "𛂦", "𛂧", "𛂨"]],
	["ひ", ["𛂩", "𛂪", "𛂫", "𛂬", "𛂭", "𛂮", "𛂯"]],
	["ふ", ["𛂰", "𛂱", "𛂲"]],
	["へ", ["𛂳", "𛂴", "𛂵", "𛂶", "𛂷", "𛂸", "𛂹"]],
	["ほ", ["𛂺", "𛂻", "𛂼", "𛂽", "𛂾", "𛂿", "𛃀", "𛃁"]],
	["ま", ["𛃂", "𛃃", "𛃄", "𛃅", "𛃆", "𛃇", "𛃈", "𛃖"]],
	["み", ["𛃉", "𛃊", "𛃋", "𛃌", "𛃍", "𛃎", "𛃏"]],
	["む", ["𛃐", "𛃑", "𛃒", "𛃓", "𛄝", "𛄞"]],
	["め", ["𛃔", "𛃕", "𛃖"]],
	["も", ["𛃗", "𛃘", "𛃙", "𛃚", "𛃛", "𛃜", "𛄝", "𛄞"]],
	["や", ["𛃝", "𛃞", "𛃟", "𛃠", "𛃡", "𛃢"]],
	null,
	["ゆ", ["𛃣", "𛃤", "𛃥", "𛃦"]],
	null,
	["よ", ["𛃧", "𛃨", "𛃩", "𛃪", "𛃫", "𛃬"]],
	["ら", ["𛃭", "𛃮", "𛃯", "𛃰"]],
	["り", ["𛃱", "𛃲", "𛃳", "𛃴", "𛃵", "𛃶", "𛃷"]],
	["る", ["𛃸", "𛃹", "𛃺", "𛃻", "𛃼", "𛃽"]],
	["れ", ["𛃾", "𛃿", "𛄀", "𛄁"]],
	["ろ", ["𛄂", "𛄃", "𛄄", "𛄅", "𛄆", "𛄇"]],
	["わ", ["𛄈", "𛄉", "𛄊", "𛄋", "𛄌"]],
	["ゐ", ["𛄍", "𛄎", "𛄏", "𛄐", "𛄑"]],
	null,
	["ゑ", ["𛄒", "𛄓", "𛄔", "𛄕"]],
	["を", ["𛄖", "𛄗", "𛄘", "𛄙", "𛄚", "𛄛", "𛄜", "𛀅"]],
	["ん", ["𛄝", "𛄞"]],
	null,
	null,
	null,
	null,
] as const;
</script> 

{#if shown}
	<FloatDialog bind:shown>
		<div class="menu-content-container">
			<h2>變體假名</h2>
			<div class="kana-table">
				{#each KANA_TABLE as k}
					{#if k}
						{@const [kana, variants] = k}
					<div class="row">
						<KanaButton display={kana} variants={variants} />
						</div>
					{:else}
						<div class="row"></div>
					{/if}
				{/each}
			</div>
			<div class="panel">
				<InsertButton color="green" display="◌゙" text="゙" title="濁点" />
				<InsertButton color="green" display="◌゚" text="゚" title="半濁点" />
				<div style="flex-grow: 1"></div>
				<InsertButton color="green" display="子" text="子" title="「ネ」の異体字（漢字で代用）" />
				<InsertButton color="green" display="井" text="井" title="「井」の異体字（漢字で代用）" />
			</div>
		</div>
	</FloatDialog>
{:else}
  <button class="show-button" onclick={() => (shown = true)} title="變體假名パネルを開く">
    <div class="kana">𛀂</div>
  </button>
{/if}

<style>
  .kana-table {
		padding: 0.25em;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.25em;
  }

	button {
		font-family: 'Noto Serif Hentaigana', 'UniHentaiKana', serif;
	}

	h2 {
		margin: 0;
		border: none;
		font-size: 1.25em;
		font-family: inherit;
		width: 100%;
		text-align: center;
		font-weight: bold;
	}

	.menu-content-container {
		display: flex;
		flex-direction: column;
		font-family: 'Noto Serif Hentaigana', 'UniHentaiKana', serif;
	}

	.show-button {
    position: fixed;
    right: 0;
    top: 40%;
		height: 3rem;
    transform: translateY(-50%);
    background-color: #fff;
    padding: 0.5em;
    border-radius: 0.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 1em #00000033;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    transition: transform 0.1s ease-in-out;
    border: 1px solid #ccc;
		color: #ff36a4;
  }

  .show-button:hover {
    transform: translateY(-50%) scale(1.1);
  }

	.kana {
		font-size: 2em;
	}

	.panel {
		display: flex;
		flex-direction: row;
		gap: 0.25em;
		padding: 0.25em;
	}
</style>