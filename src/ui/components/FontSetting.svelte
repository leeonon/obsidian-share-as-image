<script lang="ts">
  import { onMount } from 'svelte';
  import { markdownMakeImageConfig } from '@/store';
  import { PAGE_FONT_FAMILY } from '@/constant';
  import { getLocalFont } from '@/utils';

  let fonts: string[] = [];

  onMount(async () => {
    fonts = await getLocalFont();
  });

  function onLoadFont(item: { name: string; link: string }) {
    const id = `custom-remote-font-${item.name.replace(/\s*/g, '')}-script`;
    markdownMakeImageConfig.update({
      fontFamily: item.name,
    });
    if (document.querySelector(`#${id}`)) {
      return;
    }
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = item.link;
    document.head.appendChild(link);
  }

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    markdownMakeImageConfig.update({ fontFamily: target.value });
  }
</script>

<div class="item">
  <div class="label">FontFamily</div>
  <!-- <div class="page-font-btn">
    {#each PAGE_FONT_FAMILY as font}
      <div title="{font.name}" on:click="{() => onLoadFont(font)}" class="font-btn">A</div>
    {/each}
  </div> -->
  <select placeholder="All local fonts" class="dropdown cti-select-dropdown" name="fontSize" on:change="{handleChange}">
    <option value="var(--font-text)" selected hidden>All Local Fonts</option>
    {#each fonts as font}
      <option value="{font}">{font}</option>
    {/each}
  </select>
</div>

<style>
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75em 0;
    border-bottom: 1px solid var(--background-modifier-border);
  }
  .label {
    color: var(--text-normal);
    font-size: var(--font-ui-medium);
    line-height: var(--line-height-tight);
  }
  .item .dropdown {
    width: 60%;
  }
  /* .page-font-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.3rem 0;
  }
  .font-btn {
    width: 3rem;
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    border: 1px solid var(--color-base-30);
    border-radius: 4px;
    cursor: pointer;
  }
  .font-btn:active,
  .font-btn:hover {
    color: var(--color-blue);
    background-color: var(--color-base-30);
    transition: all 0.15s;
  } */
</style>
