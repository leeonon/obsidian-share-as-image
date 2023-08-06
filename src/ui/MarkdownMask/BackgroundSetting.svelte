<script lang="ts">
  import { MARKDOWN_BACKGROUND } from '@/constant/background';
  import { markdownMakeImageConfig } from '@/store';

  function onChangeColor(color: (typeof MARKDOWN_BACKGROUND)[number]) {
    markdownMakeImageConfig.update({ backgroundColor: color.value });
  }
</script>

<div class="markdown-mask-background">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="item-card item-card-custom" on:click="{() => onChangeColor({ type: 'color', value: 'unset' })}">
    Unset
  </div>
  {#each MARKDOWN_BACKGROUND as color, i}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="item-card" style="background-image: {color.value};" on:click="{() => onChangeColor(color)}"></div>
  {/each}
</div>

<style lang="scss">
  .markdown-mask-background {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
    .item-card {
      width: 4rem;
      height: 4rem;
      border-radius: 4px;
      cursor: pointer;
    }
    .item-card-custom {
      display: flex;
      align-items: center;
      justify-content: center;
      border: var(--tab-outline-width) solid var(--tab-outline-color);
    }
  }
</style>
