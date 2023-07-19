<script lang="ts">
  import type { CodeImageSettings } from '@/types';

  import { onDestroy } from 'svelte';
  import { editConfig } from '@/store';
  import { Theme } from '@/themes';
  import { langs } from '@/ui/Codemirror/lang';
  import BackgroundCard from '@/ui/BackgroundCard.svelte';

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
      {#each Theme as item (item.name)}
        <option value="{item.name}">{item.name}</option>
      {/each}
    </select>
  </div>
  <div class="cti-title-bar_item">
    <span>Background</span>
    <div
      class="checkbox-container"
      on:keypress="{() => {}}"
      class:is-enabled="{$editConfig.hasBackground}"
      on:click="{() => editConfig.update({ hasBackground: !$editConfig.hasBackground })}">
      <input type="checkbox" bind:value="{$editConfig.hasBackground}" />
    </div>
  </div>
  <div class="cti-title-bar_item">
    <span>BackgroundColor</span>
    <BackgroundCard />
  </div>
  <div class="cti-title-bar_item">
    <span>Window Controls</span>
    <div
      class="checkbox-container"
      class:is-enabled="{$editConfig.windowControls}"
      on:keypress="{() => {}}"
      on:click="{() => editConfig.update({ windowControls: !$editConfig.windowControls })}">
      <input type="checkbox" bind:value="{$editConfig.windowControls}" />
    </div>
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
    <div
      class="checkbox-container"
      class:is-enabled="{$editConfig.showLineNumber}"
      on:keypress="{() => {}}"
      on:click="{() => editConfig.update({ showLineNumber: !$editConfig.showLineNumber })}">
      <input type="checkbox" bind:value="{$editConfig.showLineNumber}" />
    </div>
  </div>
  <div class="cti-title-bar_item">
    <span>Watermark</span>
    <div
      class="checkbox-container"
      class:is-enabled="{$editConfig.hasWatermark}"
      on:keypress="{() => {}}"
      on:click="{() => editConfig.update({ hasWatermark: !$editConfig.hasWatermark })}">
      <input type="checkbox" bind:value="{$editConfig.hasWatermark}" />
    </div>
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
