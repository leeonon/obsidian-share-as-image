<script lang="ts">
  import type { CodeImageSettings } from '@/types';

  import { onDestroy } from 'svelte';
  import { editConfig } from '@/store';
  import { themeList } from '@/themes';
  import { FONT_SIZE } from '@/constant';
  import { langs } from '@/ui/code/Codemirror/lang';
  import BackgroundCard from '@/ui/code/BackgroundCard.svelte';

  export let onSave: (settings: CodeImageSettings) => void;

  function handlerSave() {
    onSave($editConfig);
  }
</script>

<div class="cti-title-bar">
  <div class="cti-title-bar-title">Options</div>
  <div class:active="{true}" class="cti-title-bar_item">
    <span>Theme</span>
    <select class="dropdown cti-select-dropdown" name="Version" bind:value="{$editConfig.theme}">
      {#each themeList as item (item.name)}
        <option value="{item.name}">{item.name}</option>
      {/each}
    </select>
  </div>
  <div class="cti-title-bar_item">
    <span>Background</span>
    <button
      class="checkbox-container"
      on:keypress="{() => {}}"
      class:is-enabled="{$editConfig.hasBackground}"
      on:click="{() => editConfig.update({ hasBackground: !$editConfig.hasBackground })}">
      <input type="checkbox" bind:value="{$editConfig.hasBackground}" />
    </button>
  </div>
  <div class="cti-title-bar_item">
    <span>BackgroundColor</span>
    <BackgroundCard />
  </div>
  <div class="cti-title-bar_item">
    <span>Window Controls</span>
    <button
      class="checkbox-container"
      class:is-enabled="{$editConfig.windowControls}"
      on:keypress="{() => {}}"
      on:click="{() => editConfig.update({ windowControls: !$editConfig.windowControls })}">
      <input type="checkbox" bind:value="{$editConfig.windowControls}" />
    </button>
  </div>
  <div class:active="{true}" class="cti-title-bar_item">
    <span>Language</span>
    <select class="dropdown cti-select-dropdown" name="Version" bind:value="{$editConfig.language}">
      {#each Object.keys(langs) as lang (lang)}
        <option value="{lang}">{lang}</option>
      {/each}
    </select>
  </div>
  <div class="cti-title-bar_item">
    <span>Line Number</span>
    <button
      class="checkbox-container"
      class:is-enabled="{$editConfig.showLineNumber}"
      on:keypress="{() => {}}"
      on:click="{() => editConfig.update({ showLineNumber: !$editConfig.showLineNumber })}">
      <input type="checkbox" bind:value="{$editConfig.showLineNumber}" />
    </button>
  </div>
  <div class:active="{true}" class="cti-title-bar_item">
    <span>Font Size{$editConfig.fontSize}</span>
    <select class="dropdown cti-select-dropdown" name="fontSize" bind:value="{$editConfig.fontSize}">
      {#each FONT_SIZE as size (size)}
        <option value="{size.value}">{size.name}</option>
      {/each}
    </select>
  </div>
  <div class="cti-title-bar_item">
    <span>Watermark</span>
    <button
      class="checkbox-container"
      class:is-enabled="{$editConfig.hasWatermark}"
      on:keypress="{() => {}}"
      on:click="{() => editConfig.update({ hasWatermark: !$editConfig.hasWatermark })}">
      <input type="checkbox" bind:value="{$editConfig.hasWatermark}" />
    </button>
  </div>
  <button on:click="{handlerSave}">Set as default Settings</button>
</div>

<style lang="scss">
  .cti-title-bar {
    flex: 0 0 25%;
    display: flex;
    flex-direction: column;
    align-items: start;
    min-width: 180px;
    max-width: 250px;
    overflow: auto;
    border-right: 1px solid var(--divider-color);
    padding: var(--size-4-3);
    background-color: var(--background-secondary);

    &-title {
      font-size: var(--font-ui-smaller);
      color: var(--text-faint);
      font-weight: var(--font-semibold);
      padding: var(--size-4-5);
      user-select: none;
    }

    &_item {
      width: 100%;
      height: 3.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--text-normal);
      font-size: var(--font-ui-medium);
      line-height: var(--line-height-tight);
      border-top: 1px solid var(--background-modifier-border);
    }

    & > button {
      margin: auto auto 0;
    }
  }
</style>
