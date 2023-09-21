<script lang="ts">
  import type { TextStyleType } from '@/constant';
  import { onMount, onDestroy } from 'svelte';
  import { TEXT_STYLE } from '@/constant';
  import { createSpanRange } from '@/utils';

  export let containerElement: HTMLElement;
  let selection: Selection | null; // Select the selection object for the content

  const controller = new AbortController();

  const onMouseUp = () => {
    const documentSelection = window.getSelection();
    if (documentSelection && documentSelection?.toString().length > 0) {
      selection = documentSelection;
    } else {
      selection = null;
    }
  };

  $: onChangeSelectionDom = (element: HTMLSpanElement) => {
    if (!selection) return;

    const range = selection?.getRangeAt(0);
    range?.extractContents();
    range.insertNode(element);
    selection = null;
  };

  const onSetElementColor = (value: TextStyleType) => {
    if (!selection) return;
    let styles = {};

    if (value.type === 'gradient') {
      styles = {
        color: 'transparent',
        'background-image': value.value,
        '-webkit-background-clip': 'text',
      };
    } else {
      styles = {
        'background-image': 'unset',
        color: value.value,
      };
    }

    const span = createSpanRange('span', selection, styles);
    onChangeSelectionDom(span);
  };

  onMount(() => {
    containerElement.addEventListener('mouseup', onMouseUp, { signal: controller.signal });
  });

  onDestroy(() => {
    controller.abort();
  });

  // $: bold = selection?.anchorNode?.parentElement?.tagName === 'STRONG';
  // $: italic = selection?.anchorNode?.parentElement?.tagName === 'EM';
  // $: strikethrough = selection?.anchorNode?.parentElement?.tagName === 'S';
  // $: underline = selection?.anchorNode?.parentElement?.tagName === 'U';
</script>

<div class="markdown-mark-text-style">
  <div class="font-style-color">
    {#each TEXT_STYLE as style}
      <div
        class:disable="{!selection}"
        class="text-item"
        style="background: {style.value}"
        on:click="{() => onSetElementColor(style)}">
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .markdown-mark-text-style {
    display: flex;
    flex-direction: column;
  }
  .font-style-color {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.3rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
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
