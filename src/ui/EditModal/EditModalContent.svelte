<script lang="ts">
  import type { LanguageType } from '@/ui/Codemirror/lang';

  import { onDestroy } from 'svelte';
  import CodeMirror from '@/ui/Codemirror/index.svelte';
  import ConfigBar from '@/ui/ConfigBar.svelte';
  import WindowBar from '@/ui/WindowBar.svelte';
  import store, { type EditConfigType } from '@/store';

  let editConfig: EditConfigType;
  let docStore: any;
  export let value: string;
  export let lang: LanguageType;
  export let actions: {
    toPng: () => void;
  };

  function changeHandler({ detail: { tr } }: any) {
    console.log('change', tr.changes.toJSON());
  }

  const unsubscribe = store.editConfig.subscribe(config => (editConfig = config));

  /**
   * Unsubscribe when destroyed
   */
  onDestroy(unsubscribe);
</script>

<ConfigBar />
<div class="ctj-edit_background" id="code-to-image-content">
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
      <div class="ctj-edit_watermark" contenteditable>@Obsidian</div>
    {/if}
  </div>
</div>
<div class="ctj-edit_panel">
  <button>Copy</button>
  <button class="mod-cta" on:click="{actions.toPng}">Download</button>
</div>

<style lang="scss">
  :global(.codemirror) {
    border: 1px solid #ddd;
  }
  .ctj-edit {
    &_background {
      position: relative;
      width: fit-content;
      margin: auto;
      padding: 2rem;
      border-radius: 0.75rem;
      background-image: linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%);
      background-color: rgb(65, 88, 208);
      overflow: auto;
      resize: both;
      min-width: 500px;
      margin-bottom: 5rem;
    }

    &_content {
      border-radius: 0.75rem;
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
    }
  }
</style>
