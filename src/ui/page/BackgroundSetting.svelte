<script lang="ts">
  import { MARKDOWN_BACKGROUND } from '@/constant/background';
  import { markdownMakeImageConfig } from '@/store';

  function onChangeColor(color: (typeof MARKDOWN_BACKGROUND)[number]) {
    markdownMakeImageConfig.update({ backgroundColor: color.value });
  }
</script>

<div class="markdown-page-background">
  <button class="item-card item-card-custom" on:click="{() => onChangeColor({ type: 'color', value: 'unset' })}">
    Unset
  </button>
  {#each MARKDOWN_BACKGROUND as color, i}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <button
      class="item-card"
      class:active="{color.value === $markdownMakeImageConfig.backgroundColor}"
      style="background: {color.value};"
      on:click="{() => onChangeColor(color)}">
    </button>
  {/each}
</div>

<style lang="scss">
  .markdown-page-background {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.3rem;
    margin-top: 1rem;
    .item-card {
      position: relative;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 4px;
      font-size: 0.7rem;
      cursor: pointer;

      &.active {
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 2.6rem;
          height: 2.6rem;
          border-radius: 6px;
          transform: translate(-50%, -50%);
          border: 2px solid rgba(47, 229, 164, 0.67);
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
      }

      &:hover {
        filter: brightness(1.3);
      }
    }
    .item-card-custom {
      display: flex;
      align-items: center;
      justify-content: center;
      border: var(--tab-outline-width) solid var(--tab-outline-color);
    }
  }
</style>
