<script context="module" lang="ts">
  export type MarkdownMaskContentProps = {
    title: string;
    content: string;
    sourcePath: string;
    parentComponent: Component;
    frontmatter?: {
      author?: string;
      created?: string;
      modified?: string;
      tags?: string[];
    };
  };
</script>

<script lang="ts">
  import { Component, MarkdownPreviewView, App } from 'obsidian';
  import { onMount, onDestroy } from 'svelte';
  import { markdownMakeImageConfig } from '@/store';
  import MarkdownMaskSetting from './Setting.svelte';
  import NormalStyleContainer from './Container.svelte';
  import Frontmatter from './Frontmatter.svelte';

  export let containerElement: HTMLElement;
  export let app: App;
  export let title: MarkdownMaskContentProps['title'];
  export let content: MarkdownMaskContentProps['content'];
  export let frontmatter: MarkdownMaskContentProps['frontmatter'];
  export let sourcePath: MarkdownMaskContentProps['sourcePath'];
  export let parentComponent: MarkdownMaskContentProps['parentComponent'];

  console.log('markdownMakeImageConfig:', markdownMakeImageConfig);

  let element: HTMLDivElement;
  let selection: Selection | null; // Select the selection object for the content

  const controller = new AbortController();

  const onMouseUp = (e: Event) => {
    // @ts-ignore
    const documentSelection = containerElement.getSelection();
    if (documentSelection?.toString().length > 0) {
      selection = documentSelection;
    } else {
      selection = null;
    }
  };

  const onChangeSelectionDom = (element: HTMLSpanElement) => {
    if (!selection) return;

    const range = selection?.getRangeAt(0);
    range?.extractContents();
    range.insertNode(element);
    selection = null;
  };

  onMount(() => {
    MarkdownPreviewView.render(app, content, element, sourcePath, parentComponent).then(() => {
      element.querySelectorAll('pre').forEach(pre => {
        const code = pre.querySelector('code');
        pre.innerHTML = '';
        if (code) {
          pre.appendChild(code);
        }
      });
    });

    containerElement.addEventListener('mouseup', onMouseUp, { signal: controller.signal });
  });

  onDestroy(() => {
    controller.abort();
  });
</script>

<div class="share-to-image-markdown">
  <NormalStyleContainer>
    <div
      class="container"
      style="
			background-image: {$markdownMakeImageConfig.backgroundColor};
			padding: {$markdownMakeImageConfig.outerPadding}rem;
			width: {$markdownMakeImageConfig.pageSize / 2}px;
		">
      <div class="content" style="padding: 1rem {$markdownMakeImageConfig.innerPadding}rem;">
        <h1 class="content-title">{title}</h1>
        {#if $markdownMakeImageConfig.frontmatter.visible}
          <Frontmatter
            author="{frontmatter?.author}"
            created="{frontmatter?.created}"
            modified="{frontmatter?.modified}"
            tags="{frontmatter?.tags}" />
        {/if}
        <div
          bind:this="{element}"
          style="
						font-size: {$markdownMakeImageConfig.fontSize}px;
						line-height: {$markdownMakeImageConfig.lineHeight};
						letter-spacing: {$markdownMakeImageConfig.letterSpacing === 0
            ? `norma;`
            : `${$markdownMakeImageConfig.letterSpacing}px`};
						color: {$markdownMakeImageConfig.color};">
        </div>
      </div>
    </div>
  </NormalStyleContainer>
  <div class="left share-to-image-markdown-text">
    <MarkdownMaskSetting selection="{selection}" />
  </div>
</div>

<style lang="css">
  .share-to-image-markdown {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0 auto;
    border-radius: 6px;
    mask: linear-gradient(rgba(29, 31, 34, 0.8) 90%, transparent 100%);
    font-family: 'Wotfard', -apple-system, sans-serif;
  }
  .content {
    background-color: var(--background-primary);
    margin: 0 auto;
    border-radius: 6px;
    box-shadow: 0px 1px 20px 8px #13121263;
  }
  .content-title {
    padding-bottom: 16px;
    border-bottom: var(--tab-outline-width) solid var(--tab-outline-color);
  }
  .left {
    width: 280px;
    min-width: 280px;
    height: calc(100% - 4rem);
    border-radius: 6px;
    border: var(--tab-outline-width) solid var(--tab-outline-color);
  }
</style>
