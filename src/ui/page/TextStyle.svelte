<script lang="ts">
  import type { TextStyleType } from '@/constant';
  import { TEXT_STYLE } from '@/constant';
  import { createSpanRange } from '@/utils';

  export let selection: Selection | null;

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

  const onSetStrong = () => {
    if (!selection) return;
    const strong = createSpanRange('strong', selection);
    onChangeSelectionDom(strong);
  };

  const onSetItalic = () => {
    if (!selection) return;
    const italic = createSpanRange('em', selection);
    onChangeSelectionDom(italic);
  };

  $: bold = selection?.anchorNode?.parentElement?.tagName === 'STRONG';
  $: italic = selection?.anchorNode?.parentElement?.tagName === 'EM';
  $: strikethrough = selection?.anchorNode?.parentElement?.tagName === 'S';
  $: underline = selection?.anchorNode?.parentElement?.tagName === 'U';
</script>

<div class="markdown-mark-text-style">
  <div class="font-style-color">
    {#each TEXT_STYLE as style}
      <div
        class:disable="{!!selection}"
        class="text-item"
        style="background: {style.value}"
        on:click="{() => onSetElementColor(style)}">
      </div>
    {/each}
  </div>
  <div class="font-style-container">
    <div class="font-style-item" class:active="{bold}" on:click="{onSetStrong}">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-bold"
        ><path d="M14 12a4 4 0 0 0 0-8H6v8"></path><path d="M15 20a4 4 0 0 0 0-8H6v8Z"></path></svg>
    </div>
    <div class="font-style-item" class:active="{italic}" on:click="{onSetItalic}">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-italic"
        ><line x1="19" x2="10" y1="4" y2="4"></line><line x1="14" x2="5" y1="20" y2="20"></line><line
          x1="15"
          x2="9"
          y1="4"
          y2="20"></line
        ></svg>
    </div>
    <div class="font-style-item" class:active="{strikethrough}">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-strikethrough"
        ><path d="M16 4H9a3 3 0 0 0-2.83 4"></path><path d="M14 12a4 4 0 0 1 0 8H6"></path><line
          x1="4"
          x2="20"
          y1="12"
          y2="12"></line
        ></svg>
    </div>
    <div class="font-style-item" class:active="{underline}">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-spell-check-2"
        ><path d="m6 16 6-12 6 12"></path><path d="M8 12h8"></path><path
          d="M4 21c1.1 0 1.1-1 2.3-1s1.1 1 2.3 1c1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1"
        ></path
        ></svg>
    </div>
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
  .font-style-container {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.8em;
    .font-style-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      padding: 0.2rem 0;
      cursor: pointer;
      transition: all 0.15s;
      margin-top: 0.4rem;
      border: 1px solid var(--background-modifier-hover);
      &:hover {
        background-color: var(--background-modifier-hover);
      }

      &.active {
        background-color: var(--background-modifier-hover);
        filter: brightness(1.3);
      }

      & > svg {
        width: 1rem;
      }
    }
  }
</style>
