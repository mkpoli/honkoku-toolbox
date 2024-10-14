<script lang="ts">
import type { Editor } from "$lib/editor";
import { setContext } from "svelte";
import FloatDialog from "$lib/ui/FloatDialog.svelte";
import InsertButton from "$lib/buttons/InsertButton.svelte";

let { editor }: { editor: Editor } = $props();
setContext("editor", editor);
import InsertButtonVariantKanji from "./buttons/InsertButtonVariantKanji.svelte";
import type { Color } from "./color";

let shown = $state(false);

const GROUPED_VARIANTS = {
	"者→者": [
		["者", "者"],
		["諸", "諸"],
		["著", "著"],
		["緒", "緖"],
		["暑", "暑"],
		["渚", "渚"],
		["煮", "煮"],
		["署", "署"],
		["猪", "猪"],
		["都", "都"],
	],
	"毎→每": [
		["毎", "每"],
		["侮", "侮"],
		["悔", "悔"],
		["敏", "敏"],
		["梅", "梅"],
		["海", "海"],
		["繁", "繁"],
	],
	"礻→示": [
		["神", "神"],
		["祥", "祥"],
		["福", "福"],
		["視", "視"],
		["社", "社"],
		["祉", "祉"],
		["祈", "祈"],
		["祐", "祐"],
		["祖", "祖"],
		["祝", "祝"],
		["禍", "禍"],
		["禎", "禎"],
	],
	"真→眞": [
		["真", "眞"],
		["顛", "顚"],
	],
	"开→幵": [
		["研", "硏"],
		["妍", "姸"],
		["笄", "筓"],
	],
	"并→幷": [
		["并", "幷"],
		["併", "倂"],
		["胼", "腁"],
		["駢", "騈"],
		["迸", "逬"],
		["瓶", "甁"],
		["屏", "屛"],
		["塀", "塀"],
	],
	"𢀳→皀": [
		["即", "卽"],
		["節", "節"],
		["既", "旣"],
		["郷", "鄕"],
		["慨", "慨"],
		["概", "槪"],
		["㮣", "槩"],
	],
	"曽→曾": [
		["曽", "曾"],
		["僧", "僧"],
		["層", "層"],
		["憎", "憎"],
		["贈", "贈"],
		["増", "增"],
	],
	"黒→黑": [
		["黒", "黑"],
		["墨", "墨"],
		["薫", "薰"],
	],
	"東→柬": [
		["練", "練"],
		["錬", "鍊"],
		["欄", "欄"],
	],
	"⺈→刀": [
		["免", "免"],
		["逸", "逸"],
		["晩", "晚"],
		["勉", "勉"],
	],
	"廿→艹": [
		["漢", "漢"],
		["難", "難"],
		["勤", "勤"],
		["嘆", "嘆"],
	],
	"兑→兌": [
		["兑", "兌"],
		["悦", "悅"],
		["説", "說"],
		["脱", "脫"],
		["鋭", "銳"],
		["閲", "閱"],
	],
	"戸→戶": [
		["戸", "戶"],
		["戻", "戾"],
		["涙", "淚"],
	],
	"豕→豖": [["琢", "琢"]],
	"卑→卑": [
		["卑", "卑"],
		["碑", "碑"],
	],
	"匂→匃": [
		["喝", "喝"],
		["褐", "褐"],
		["謁", "謁"],
		["掲", "揭"],
		["渇", "渴"],
	],
	"大→犬": [
		["器", "器"],
		["突", "突"],
		["臭", "臭"],
		["戻", "戾"],
		["涙", "淚"],
		["類", "類"],
	],
} as const;

const VARIANTS: { traditional: string; simplified: string; color: Color }[] = [
	{ traditional: "敎", simplified: "教", color: "blue" },
	{ traditional: "內", simplified: "内", color: "pink" },
];

$effect(() => {
	for (const { simplified } of VARIANTS) {
		if (text.includes(simplified)) {
			editor.markText(simplified);
		}
	}

	for (const [_key, variants] of Object.entries(GROUPED_VARIANTS)) {
		for (const [display, _variant] of variants) {
			if (text.includes(display)) {
				editor.markText(display);
			}
		}
	}
});

let text = $state(editor.text);

editor.onchange(() => {
	text = editor.text;
});

let highlight = $state(false);
$effect(() => {
	editor.toggleClass("display-variant-highlight", highlight);
});
</script> 

{#if shown}
	<FloatDialog bind:shown>
		<div class="container">
			<h2>異體漢字</h2>
			<label >
				<input type="checkbox" bind:checked={highlight} name="highlight"  />
				<span>異體字をハイライト</span>
			</label>
			<div class="panel">
				{#each VARIANTS as {traditional, simplified, color}}
					<InsertButton color={color} text={traditional} display={`${traditional}=${simplified}`} />
				{/each}
				{#each Object.entries(GROUPED_VARIANTS) as [key, variants]}
					<InsertButtonVariantKanji display={key} variants={variants} />
				{/each}
			</div>
		</div>
	</FloatDialog>
{:else}
  <button class="show-button" onclick={() => (shown = true)} title="變體假名パネルを開く">
    <div class="icon">異</div>
  </button>
{/if}

<style>
	h2 {
		margin: 0;
		border: none;
		font-size: 1.25em;
		font-family: inherit;
		width: 100%;
		text-align: center;
		font-weight: bold;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 0.25em;
		align-items: stretch;
		justify-content: center;
		font-family: 'Noto Serif Hentaigana', 'UniHentaiKana', serif;
	}

	.show-button {
    position: fixed;
    right: 0;
    top: 60%;
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
  }

  .show-button:hover {
    transform: translateY(-50%) scale(1.1);
  }

	.icon {
		font-size: 2em;
	}

	.panel {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 0.25em;
		max-width: 20em;
	}

	label {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5em;
	}
</style>