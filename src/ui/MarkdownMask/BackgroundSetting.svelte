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
    <div
      class="item-card"
      class:active="{color.value === $markdownMakeImageConfig.color}"
      style="background: {color.value};"
      on:click="{() => onChangeColor(color)}">
    </div>
  {/each}
</div>

<style lang="scss">
  .markdown-mask-background {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.3rem;
    margin-top: 1rem;
    .item-card {
      position: relative;
      width: 3rem;
      height: 3rem;
      border-radius: 4px;
      cursor: pointer;

      &.active {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 33px;
        height: 33px;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        border: 2px solid red;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
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
