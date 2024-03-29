<script lang="ts">
  import type { LanguageType } from '@/ui/code/Codemirror/lang';
  import type { CodeImageSettings } from '@/types';

  import { onDestroy, onMount } from 'svelte';
  import { setIcon } from 'obsidian';

  import CodeMirror from '@/ui/code/Codemirror/index.svelte';
  import Setting from '@/ui/code/Setting.svelte';
  import WindowBar from '@/ui/code/WindowBar.svelte';
  import ResizeContainer from '@/ui/code/ResizeContainer.svelte';
  import { themeList } from '@/themes';

  import store from '@/store';

  export let value: string;
  export let actions: {
    onExport: () => void;
    onCopyAsImage: () => void;
    setDefaultSetting: (settings: CodeImageSettings) => void;
  };

  let editConfig: CodeImageSettings;
  let docStore: any;
  let containerEl: HTMLDivElement;

  $: background = editConfig.hasBackground ? editConfig.backgroundColor : null;
  $: color = themeList.find(v => v.name === editConfig.theme)?.color;

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

<div class="ctj-edit">
  <Setting onSave="{actions.setDefaultSetting}" />
  <div class="ctj-edit_container" bind:this="{containerEl}">
    <div class="ctj-edit_panel">
      <button on:click="{actions.onCopyAsImage}">Copy</button>
      <button class="mod-cta" on:click="{actions.onExport}">Export <span use:addButtonIcon></span></button>
    </div>
    <ResizeContainer containerEl="{containerEl}">
      <div class="ctj-edit_background" id="ctj-edit_background" style="background-image: {background}">
        <div class="ctj-edit_content" style="background-color: {color?.background};">
          {#if editConfig.windowControls}
            <WindowBar />
          {/if}
          <CodeMirror
            theme="{editConfig.theme}"
            lang="{editConfig.language}"
            fontSize="{editConfig.fontSize}"
            doc="{value}"
            bind:docStore="{docStore}"
            on:change="{changeHandler}"
            extensions="{{
              lineNumbers: editConfig.showLineNumber,
            }}" />
          {#if editConfig.hasWatermark}
            <div class="ctj-edit_watermark" contenteditable>@{editConfig.watermark}</div>
          {/if}
        </div>
      </div>
    </ResizeContainer>
  </div>
</div>

<style lang="scss">
  :global(.codemirror) {
    border: unset;
  }
  .ctj-edit {
    display: flex;
    &_container {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    &_panel {
      height: 4rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      gap: 1rem;
      background-color: var(--background-secondary);

      & > button {
        gap: 0.3em;
      }
    }
    &_background {
      position: relative;
      width: inherit;
      padding: 2rem;
      background-color: transparent;
      overflow: auto;
    }

    &_content {
      border-radius: 8px;
      background-color: rgba(31, 41, 55, 0.8);
      overflow: hidden;
    }

    &_watermark {
      position: absolute;
      right: 1rem;
      bottom: 0.5rem;
      mix-blend-mode: overlay;
    }
  }
</style>
