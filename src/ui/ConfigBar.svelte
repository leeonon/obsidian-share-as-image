<script lang="ts">
import { onDestroy } from 'svelte';
import { editConfig } from '@/store';

const options = [
  { value: 'OneDarkTheme', name: 'OneDarkTheme' },
  { value: 'OneDark2', name: 'OneDark2' },
  { value: 'OneDark3', name: 'OneDark3' },
  { value: 'OneDark4', name: 'OneDark4' },
];

const editCOnfigSubscribed = editConfig.subscribe(state => {
  console.log('🚀 ~ file: TitleBar.svelte:13 ~ editCOnfigSubscribed ~ state', state);
});

onDestroy(() => {});
</script>

<div class="cti-title-bar">
  <div class:active="{true}" class="cti-title-bar_item">
    <span>Theme：</span>
    <select class="dropdown cti-select-dropdown" name="Version" bind:value="{$editConfig.theme}">
      {#each options as item (item.value)}
        <option value="{item.value}">{item.name}</option>
      {/each}
    </select>
  </div>
  <div class="cti-title-bar_item">
    <span>Background：</span>
    <div
      class="checkbox-container"
      on:keypress="{() => {}}"
      class:is-enabled="{$editConfig.hasBackground}"
      on:click="{() => editConfig.update({ hasBackground: !$editConfig.hasBackground })}">
      <input type="checkbox" bind:value="{$editConfig.hasBackground}" />
    </div>
  </div>
  <div class="cti-title-bar_item">
    <span>DarkMode：</span>
    <div
      class="checkbox-container"
      class:is-enabled="{$editConfig.isDarkMode}"
      on:keypress="{() => {}}"
      on:click="{() => editConfig.update({ isDarkMode: !$editConfig.isDarkMode })}">
      <input type="checkbox" bind:value="{$editConfig.isDarkMode}" />
    </div>
  </div>
  <div class="cti-title-bar_item">
    <span>Window Controls：</span>
    <div
      class="checkbox-container"
      class:is-enabled="{$editConfig.windowControls}"
      on:keypress="{() => {}}"
      on:click="{() => editConfig.update({ windowControls: !$editConfig.windowControls })}">
      <input type="checkbox" bind:value="{$editConfig.windowControls}" />
    </div>
  </div>
  <div class="cti-title-bar_item">
    <span>Line Number：</span>
    <div
      class="checkbox-container"
      class:is-enabled="{$editConfig.showLineNumber}"
      on:keypress="{() => {}}"
      on:click="{() => editConfig.update({ showLineNumber: !$editConfig.showLineNumber })}">
      <input type="checkbox" bind:value="{$editConfig.showLineNumber}" />
    </div>
  </div>
  <div class="cti-title-bar_item">
    <span>Watermark：</span>
    <div
      class="checkbox-container"
      class:is-enabled="{$editConfig.hasWatermark}"
      on:keypress="{() => {}}"
      on:click="{() => editConfig.update({ hasWatermark: !$editConfig.hasWatermark })}">
      <input type="checkbox" bind:value="{$editConfig.hasWatermark}" />
    </div>
  </div>
</div>

<style lang="scss">
.cti-title-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  width: fit-content;
  border: 1px solid hsla(0, 0%, 100%, 0.2);
  background-color: #191919;
  box-shadow: 0 4px 16px rgb(0 0 0 / 60%);
  border-radius: 10px;
  padding: 20px;
  margin: auto;
  margin-bottom: 35px;

  &_item {
    display: flex;
    align-items: center;
    font-size: 0.75rem;
  }
}
</style>
