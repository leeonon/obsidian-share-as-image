<script lang="ts">
  export let label: string;
  export let value: number | string;
  export let type: 'range' | 'input';
  export let min: string = '0';
  export let max: string = '100';
  export let step: string = '1';
</script>

<div class="item">
  <div class="label">{label}</div>
  <div class="setting">
    {#if type === 'range'}
      <input class="slider setting-font-size" bind:value="{value}" type="range" min="{min}" max="{max}" step="{step}" />
    {:else if type === 'input'}
      <input class="slider setting-font-size" bind:value="{value}" type="input" />
    {:else}
      <slot />
    {/if}
    <span>{value}</span>
  </div>
</div>

<style>
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.75em 0;
    border-bottom: 1px solid var(--background-modifier-border);
  }
  .label {
    color: var(--text-normal);
    font-size: var(--font-ui-medium);
    line-height: var(--line-height-tight);
  }
  .setting {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.1rem;
  }
  .setting-font-size {
    width: 100%;
  }
</style>
