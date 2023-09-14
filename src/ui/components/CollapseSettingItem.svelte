<script lang="ts">
  import { onMount } from 'svelte';
  import { setIcon } from 'obsidian';

  export let label: string;

  let iconEL: HTMLElement;
  let visible = false;

  onMount(() => {
    setIcon(iconEL, 'chevron-up');
  });
</script>

<div class="collapse-setting-item">
  <div class="header" on:click="{() => (visible = !visible)}">
    <span>{label}</span>
    <div class="collapse-extra">
      <slot name="extra" />
      <i class="collapse-icon-up" class:down="{visible}" bind:this="{iconEL}"></i>
    </div>
  </div>
  <div class="collapse-setting-content" class:open="{visible}">
    <slot />
  </div>
</div>

<style>
  .collapse-setting-item {
    display: flex;
    flex-direction: column;
    padding: 0.75em 0;
    border-bottom: 1px solid var(--background-modifier-border);
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 1rem;
    cursor: pointer;
  }
  .collapse-setting-content {
    max-height: 0;
    transition: max-height 0.25s ease-in-out;
    transform-origin: top;
    overflow: hidden;
  }
  .collapse-setting-content.open {
    max-height: 800px;
  }
  .collapse-extra {
    display: flex;
    align-items: center;
  }
  .collapse-icon-up {
    margin-left: 0.3rem;
    transform: rotate(180deg);
    transition: transform 0.25s ease-in-out;
  }
  .collapse-icon-up.down {
    transform: rotate(0deg);
  }
</style>
