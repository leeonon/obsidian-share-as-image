<script lang="ts">
  import type { LanguageType } from '@/ui/Codemirror/lang';
  import type { CodeImageSettings } from '@/types';

  import { onDestroy, onMount } from 'svelte';
  import { setIcon } from 'obsidian';

  import CodeMirror from '@/ui/Codemirror/index.svelte';
  import Setting from '@/ui/Setting.svelte';
  import WindowBar from '@/ui/WindowBar.svelte';
  import ResizeContainer from '@/ui/ResizeContainer.svelte';

  import store from '@/store';

  export let value: string;
  export let lang: LanguageType;
  export let actions: {
    toPng: () => void;
    onCopyAsImage: () => void;
  };

  let editConfig: CodeImageSettings;
  let docStore: any;
  let containerEl: HTMLDivElement;

  $: background = editConfig.hasBackground ? editConfig.backgroundColor : null;

  function changeHandler({ detail: { tr } }: any) {
    console.log('change', tr.changes.toJSON());
  }

  const unsubscribe = store.editConfig.subscribe(config => (editConfig = config));

  function addButtonIcon(node: HTMLSpanElement) {
    // setIcon(node, 'chevron-up');
  }

  onMount(() => {});

  /**
   * Unsubscribe when destroyed
   */
  onDestroy(unsubscribe);
</script>

<Setting />
<div class="ctj-edit_container" bind:this="{containerEl}">
  <ResizeContainer containerEl="{containerEl}">
    <div class="ctj-edit_background" id="ctj-edit_background" style="background-image: {background}">
      <div class="ctj-edit_content">
        {#if editConfig.windowControls}
          <WindowBar />
        {/if}
        <CodeMirror
          extensions="{{
            lineNumbers: editConfig.showLineNumber,
          }}"
          lang="{lang}"
          doc="{value}"
          bind:docStore="{docStore}"
          on:change="{changeHandler}" />
        {#if editConfig.hasWatermark}
          <div class="ctj-edit_watermark" contenteditable>@{editConfig.watermark}</div>
        {/if}
      </div>
    </div>
  </ResizeContainer>
</div>
<div class="ctj-edit_panel">
  <button on:click="{actions.onCopyAsImage}">Copy</button>
  <button class="mod-cta" on:click="{actions.toPng}">Export <span use:addButtonIcon></span></button>
</div>

<style lang="scss">
  :global(.codemirror) {
    border: 1px solid #ddd;
  }
  .ctj-edit {
    &_container {
      position: relative;
      display: flex;
      justify-content: center;
      width: 100%;
      background: transparent;
      padding-bottom: 5rem;
    }
    &_background {
      position: relative;
      width: inherit;
      padding: 2rem;
      border-radius: 8px;
      /* background-image: linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%); */
      background-color: transparent;
      overflow: auto;
    }

    &_content {
      border-radius: 8px;
      background-color: rgba(31, 41, 55, 0.8);

      /* background-color: rgb(31 41 55/1); */
    }

    &_watermark {
      position: absolute;
      right: 1rem;
      bottom: 0.5rem;
      mix-blend-mode: overlay;
    }
    &_panel {
      position: absolute;
      bottom: 0;
      height: 4rem;
      background: #252525;
      width: 100%;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: end;
      gap: 1rem;
      padding-right: 2rem;

      & > button {
        gap: 0.3em;
      }
    }
  }
</style>
