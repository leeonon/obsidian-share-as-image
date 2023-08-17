<script lang="ts">
  import { TEXT_STYLE } from '@/constant';

  export let isSelection: boolean;
  export let onSetElementColor: (style: (typeof TEXT_STYLE)[number]) => void;
</script>

<div class="markdown-mark-text-style">
  {#each TEXT_STYLE as style}
    <div
      class:disable="{!isSelection}"
      class="text-item"
      style="background: {style.value}"
      on:click="{() => onSetElementColor(style)}">
    </div>
  {/each}
</div>

<style>
  .markdown-mark-text-style {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.3rem;
    margin-top: 1rem;
  }
  .text-item {
    position: relative;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;
  }
  .text-item.disable {
    filter: brightness(0.7);
    cursor: not-allowed;
  }
</style>
