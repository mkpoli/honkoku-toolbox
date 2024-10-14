<script lang="ts">
import type { Editor } from "$lib/editor";
import { setContext } from "svelte";
import InsertButton from "$lib/buttons/InsertButton.svelte";
import { GM } from "$";
import type { Color } from "$lib/color";
import CustomInsertButton from "$lib/buttons/CustomInsertButton.svelte";
import InsertButtonEdit from "$lib/buttons/InsertButtonEdit.svelte";
import FloatDialog from "$lib/ui/FloatDialog.svelte";
import InsertButtonVariantKanji from "./buttons/InsertButtonVariantKanji.svelte";

let { editor, platform }: { editor: Editor; platform: Platform } = $props();
setContext("editor", editor);

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

let text = $state(editor.text);

editor.onchange(() => {
	text = editor.text;
});

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

let editingCustom = $state(false);

type CustomButton = {
	text: string;
	display?: string;
	color: Color;
};
let customButtons: CustomButton[] = $state([]);

let customText = $state("");
let customColor = $state<Color>("black");
let customDisplay = $state("");
$effect(() => {
	customDisplay = customText;
});

(async () => {
	customButtons = JSON.parse(await GM.getValue("customButtons", "[]"));
})();

$effect(() => {
	GM.setValue("customButtons", JSON.stringify(customButtons)).then();
});
$effect(() => {
	if (editingCustom) {
		customText = editor.selectedText;
	}
});
</script>

{#if shown}
<FloatDialog bind:shown>
    <div class="panels">
      {#if platform === 'honkoku'}
        <div class="panel">
          <h3>頁注</h3>
          <InsertButton color="green" text="【左頁】" />
          <InsertButton color="green" text="【左丁】" />
          <InsertButton color="green" text="【右頁】" />
          <InsertButton color="green" text="【右丁】" />
          <InsertButton color="red" text="【上段】" />
          <InsertButton color="red" text="【中段】" />
          <InsertButton color="red" text="【下段】" />
        </div>
        <div class="panel">
          <h3>音注</h3>
          <InsertButton color="gray" text={(t) => `￣${t}`} />
          <InsertButton color="green" text="￣ハ" display="ハ" />
          <InsertButton color="green" text="￣モ" display="モ" />
          <InsertButton color="green" text="￣ヲ" display="ヲ" />
          <InsertButton color="green" text="￣ヲバ" display="ヲバ" />
          <InsertButton color="green" text="￣カ" display="カ" />
          <InsertButton color="green" text="￣ガ" display="ガ" />
          <InsertButton color="green" text="￣ノ" display="ノ" />
          <InsertButton color="green" text="￣ニ" display="ニ" />
          <InsertButton color="green" text="￣ヘ" display="ヘ" />
          <InsertButton color="green" text="￣ノミ" display="ノミ" />
          <InsertButton color="green" text="￣ト" display="ト" />
          <InsertButton color="blue" text="￣ス" display="ス" />
          <InsertButton color="blue" text="￣スル" display="ス" />
          <InsertButton color="blue" text="￣タル" display="タル" />
          <InsertButton color="blue" text="￣タリ" display="タリ" />
          <InsertButton color="blue" text="￣ナリ" display="ナリ" />
          <InsertButton color="blue" text="￣ナル" display="ナル" />
          <InsertButton color="red" text="￣レバ" display="レバ" />
        </div>
        <div class="panel">
          <h3>返点</h3>

          <InsertButton color="red" text="＿レ" display="レ" />
          <InsertButton color="blue" text="＿一" display="一" />
          <InsertButton color="blue" text="＿二" display="二" />
          <InsertButton color="blue" text="＿三" display="三" />
          <InsertButton color="blue" text="＿四" display="四" />
          <InsertButton color="green" text="＿上" display="上" />
          <InsertButton color="green" text="＿中" display="中" />
          <InsertButton color="green" text="＿下" display="下" />
          <InsertButton color="pink" text="＿甲" display="甲" />
          <InsertButton color="pink" text="＿乙" display="乙" />
          <InsertButton color="pink" text="＿丙" display="丙" />
          <InsertButton color="pink" text="＿丁" display="丁" />
          <InsertButton color="pink" text="＿天" display="天" />
          <InsertButton color="pink" text="＿地" display="地" />
          <InsertButton color="pink" text="＿人" display="人" />
          <InsertButton color="red" text="＿一レ" display="一レ" />
          <InsertButton color="red" text="＿二レ" display="二レ" />
          <InsertButton color="red" text="＿三レ" display="三レ" />
          <InsertButton color="red" text="＿四レ" display="四レ" />
          <InsertButton color="red" text="＿上レ" display="上レ" />
        </div>
        <div class="panel">
          <h3>註釋</h3>
          <InsertButton color="pink" text={(t) => `／${t}（）`} display="ルビー" />
          <InsertButton color="green" text="。" title="句点" />
          <InsertButton color="green" text="-" title="ハイフン" />
          <InsertButton color="green" text=" " display="␣" title="半角スペース" />
          <InsertButton color="green" text="　" display="▢" title="全角スペース" />
          <InsertButton color="green" text="◯" title="全角丸" />
          <InsertButton color="blue" text={(t) => `《割書：${t}｜》`} display="割注" />
          <InsertButton color="red" text={(t) => `【${t}】`} display="注釈" />
        </div>
      {/if}
      {#if platform === 'wikisource'}
        <div class="panel">
          <h3>傍点</h3>
          <InsertButton color="green" text={(t) => `{{傍点|style=filled sesame|${t}}}`} display="﹅" title="傍点（黒ゴマ）" />
          <InsertButton color="green" text={(t) => `{{傍点|style=open sesame|${t}}}`} display="﹆" title="傍点（白ゴマ）" />
          <InsertButton color="green" text={(t) => `{{傍点|style=filled dot|${t}}}`} display="•" title="傍点（黒点）" />
          <InsertButton color="green" text={(t) => `{{傍点|style=open dot|${t}}}`} display="◦" title="傍点（白点）" />
          <InsertButton color="green" text={(t) => `{{傍点|style=filled circle|${t}}}`} display="●" title="傍点（黒丸）" />
          <InsertButton color="green" text={(t) => `{{傍点|style=open circle|${t}}}`} display="○" title="傍点（白丸）" />
          <InsertButton color="green" text={(t) => `{{傍点|style=filled double-circle|${t}}}`} display="◉" title="傍点（黒二重丸）" />
          <InsertButton color="green" text={(t) => `{{傍点|style=open double-circle|${t}}}`} display="◎" title="傍点（白二重丸）" />
          <InsertButton color="green" text={(t) => `{{傍点|style=filled triangle|${t}}}`} display="▲" title="傍点（黒三角）" />
          <InsertButton color="green" text={(t) => `{{傍点|style=open triangle|${t}}}`} display="△" title="傍点（白三角）" />
          <h3>ルビー</h3>
          <InsertButton color="pink" text={(t) => `{{ruby|${t}|}}`} display="ルビ" />
        </div>
      {/if}
      <div class="panel">
        <h3>踊字</h3>
        <InsertButton color="green" text="々" title="同の字点" />
        <InsertButton color="green" text="ゝ" title="一の字点（ひらがな）" />
        <InsertButton color="green" text="ゞ" title="一の字点（ひらがな、濁点付き）" />
        <InsertButton color="green" text="ヽ" title="一の字点（カタカナ）" />
        <InsertButton color="green" text="ヾ" title="一の字点（カタカナ、濁点付き）" />
        <InsertButton color="green" text="〻" title="二の字点" />
        <InsertButton color="green" text="〳" title="くの字点上" />
        <InsertButton color="green" text="〴" title="くの字点上（濁点付き）" />
        <InsertButton color="green" text="〵" title="くの字点下" />
        <InsertButton color="green" text="〱" title="くの字点（濁点付き）" />
        <InsertButton color="green" text="〲" title="くの字点（濁点付き）" />
        <h3>合字</h3>
        <InsertButton color="green" text="〆" title="締め" />
        <InsertButton color="green" text=" ͡と" title="「こと」" />
        <InsertButton color="green" text="ゟ" title="「より」" />
        <InsertButton color="green" text="𬼂" title="「也」" />
        <InsertButton color="green" text="𬻿" title="「也」" />
        <InsertButton color="green" text="ヿ" title="「コト」" />
        <InsertButton color="green" text="𪜈" title="「トモ」" />
        <InsertButton color="green" text="𬼀" title="「タメ」" />
      </div>
      <div class="panel">
        <h3><button onclick={() => {
          editor.toggleClass("display-variant-highlight")
        }}>異體</button></h3>
        {#each VARIANTS as {traditional, simplified, color}}
          <InsertButton color={color} text={traditional} display={`${traditional}=${simplified}`} />
        {/each}
        {#each Object.entries(GROUPED_VARIANTS) as [key, variants]}
          <InsertButtonVariantKanji display={key} variants={variants} />
        {/each}
      </div>
      <div class="panel">
        <h3>其他</h3>
        <button onclick={() => {
          editingCustom = !editingCustom;
        }}>カスタム</button>
        {#if editingCustom}
          <InsertButtonEdit
            color={customColor}
            text={customText}
            display={customDisplay}
            onedit={(color, text, display) => {
            customButtons.push({
              text: text,
              color: color,
              display: !display || display === text ? undefined : display,
            });
            GM.setValue("customButtons", JSON.stringify(customButtons));
            editingCustom = false;
          }}/>
        {:else}
          {#each customButtons as {text, display, color}, i (i)}
            <CustomInsertButton 
              color={color} text={text} display={display}
              onedit={(color, text, display) => {
                customButtons[i] = { color, text, display: !display || display === text ? undefined : display };
              }}
              ondelete={() => {
                customButtons.splice(i, 1);
              }}
            />
          {/each}
        {/if}
      </div>
    </div>
  </FloatDialog>
{:else}
  <button class="show-button" onclick={() => (shown = true)} title="翻刻ツールボックスを開く">
    <img src={__ICON_URL__} alt="Honkoku" />
  </button>
{/if}

<style>
  .panel {
    border: 1px solid #ccc; /* Light grey border */
    padding: 0.25em;
    border-radius: 5px; /* Optional: rounded corners */
    display: flex;
    gap: 0;

    flex-wrap: wrap;
    border: none;
  }

  .panel > h3 {
    background-color: #f5f5f5; /* Light grey background */
    padding: 0.25em 0;
    border: 1px solid #ccc;
    margin: 0.25em 0;
    /* margin-left: 0.25em; */
  }

  .show-button {
    position: fixed;
    right: 0;
    top: 50%;
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

  .show-button img {
    width: 2em;
    height: 2em;
  }

  h3 button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-weight: inherit;
    font-family: inherit;
    font-size: inherit;
    padding: 0;
  }

  h3 button:hover {
    text-decoration: underline;
  }

  .panel button {
    margin: 0.25em 0;
  }

  .panel button + button {
    margin-bottom: 0;
  }
</style>
