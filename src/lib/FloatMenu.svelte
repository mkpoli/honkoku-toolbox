<script lang="ts">
  import { draggable } from '@neodrag/svelte';
  import { insertAtCursor, repalceSelection } from '$lib/utils';
  import { setContext } from 'svelte';
  import InsertButton from './InsertButton.svelte';

  export let textArea: HTMLTextAreaElement;

  setContext('textArea', textArea);

  function i(text: string) {
    return () => {
      if (textArea) {
        insertAtCursor(textArea, text);
      }
    };
  }

  function r(repl: (orig: string) => string) {
    return () => {
      if (textArea) {
        repalceSelection(textArea, repl);
      }
    };
  }
</script>

<div class="float-menu" use:draggable={{ handle: '.dragger' }}>
  <button class="dragger">⠿</button>
  <div class="panels">
    <div class="panel">
      <h3>位置注</h3>
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
      <InsertButton color="green" text="。" />
      <InsertButton color="green" text="-" />
      <InsertButton color="green" text=" " display="␣" />
      <InsertButton color="green" text="　" display="▢" />
      <InsertButton color="green" text="◯" />
      <InsertButton color="blue" text={(t) => `《割書：${t}｜》`} display="割注" />
      <InsertButton color="red" text={(t) => `【${t}】`} display="注釈" />
    </div>
    <div class="panel">
      <h3>異體字</h3>
      <InsertButton color="green" text="卽" display="卽=即" />
      <InsertButton color="green" text="旣" display="旣=既" />
      <InsertButton color="green" text="者" display="者=者" />
      <InsertButton color="green" text="眞" display="眞=真" />
      <InsertButton color="green" text="顚" display="顚=顛" />
      <InsertButton color="green" text="敎" display="敎=教" />
      <InsertButton color="green" text="神" display="神=神" />
    </div>
  </div>
</div>

<style>
  .float-menu {
    writing-mode: vertical-rl;

    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    z-index: 100;
    padding: 0.5em;
    gap: 0.25em;

    border-radius: 0.5em;

    box-shadow: 0 0 1em #00000033;

    display: grid;
    grid-template-columns: auto 1fr;

    user-select: none;
  }

  .float-menu .dragger {
    padding: 0.25em;
    font-size: 1.5em;
    /* width: 2em;
    height: 3em; */
    background-color: #fff;
    cursor: move;
  }

  .panel {
    border: 1px solid #ccc; /* Light grey border */
    padding: 0.5em 0.25em;
    border-radius: 5px; /* Optional: rounded corners */
    display: flex;
    gap: 0.25em;

    flex-wrap: wrap;
    border: none;
  }

  .panel > h3 {
    background-color: #f5f5f5; /* Light grey background */
    padding: 0.25em 0;
    border: 1px solid #ccc;
    border-radius: 0.5em;
    margin: 0;
    /* margin-left: 0.25em; */
  }

  .dragger {
    vertical-align: middle;
    text-align: center;
    display: flex;
    align-items: center;
  }
</style>
