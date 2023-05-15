<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let containerEl: HTMLDivElement;

  let width: number | undefined;
  let flag = false;
  let contentEl: HTMLDivElement;
  let rightEl: HTMLDivElement;

  function showFlag() {
    flag = true;
  }

  function hideFlag() {
    flag = false;
  }

  function mousemove(e: MouseEvent) {
    if (flag) {
      const { left, width: contentWidth } = contentEl.getBoundingClientRect();
      width = e.pageX - left < containerEl.clientWidth - 30 ? e.pageX - left : containerEl.clientWidth - 30;
    }
  }

  onMount(() => {
    rightEl.addEventListener('mousedown', showFlag);
    rightEl.addEventListener('mouseup', hideFlag);
    document.addEventListener('mouseup', hideFlag);

    document.addEventListener('mousemove', mousemove);
  });

  onDestroy(() => {
    rightEl.removeEventListener('mousedown', showFlag);
    rightEl.removeEventListener('mouseup', hideFlag);

    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', hideFlag);
  });
</script>

<div class="ctj-resize-container" bind:this="{contentEl}" style="width: {width}px;">
  <slot />
  <div class="ctj-resize-container_right" class:active="{flag}" bind:this="{rightEl}"></div>
</div>

<style lang="scss">
  .ctj-resize-container {
    display: flex;
    position: relative;
    margin: 3rem 0;

    &_right {
      position: absolute;
      top: 50%;
      bottom: 0;
      right: -1rem;
      z-index: 1;
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      transform: translateY(-50%);
      transition: background 0.2s;
      cursor: col-resize;

      &:hover,
      &.active {
        background: #eaeaea42;
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 1rem;
        transform: translateY(-50%) translateX(50%);
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 50%;
        background-color: #9e9999;
      }
    }
  }
</style>
