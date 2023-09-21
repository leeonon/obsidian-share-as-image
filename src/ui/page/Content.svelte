<script context="module" lang="ts">
  export type PageContentProps = {
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
  import { convertToRGBA } from '@/utils';
  import { imageToBase64 } from '@/utils/image';
  import { SHARE_TO_IMAGE_MARKDOWN_CONTAINER } from '@/constant';
  import PageSetting from './Setting.svelte';
  import NormalStyleContainer from './Container.svelte';
  import Frontmatter from './Frontmatter.svelte';

  export let containerElement: HTMLElement;
  export let app: App;
  export let title: PageContentProps['title'];
  export let content: PageContentProps['content'];
  export let frontmatter: PageContentProps['frontmatter'];
  export let sourcePath: PageContentProps['sourcePath'];
  export let parentComponent: PageContentProps['parentComponent'];

  export let handlerSave: () => void;

  let element: HTMLDivElement;
  let rootBackground: string = '';

  onMount(() => {
    rootBackground = getComputedStyle(containerElement).backgroundColor;
  });

  $: pageBackground = convertToRGBA(rootBackground, $markdownMakeImageConfig.pageOpacity);

  onMount(() => {
    MarkdownPreviewView.render(app, content, element, sourcePath, parentComponent).then(() => {
      element.querySelectorAll('pre').forEach(pre => {
        const code = pre.querySelector('code');
        pre.innerHTML = '';
        if (code) {
          pre.appendChild(code);
        }
      });

      element.querySelectorAll('img').forEach(img => {
        const url = img.getAttribute('src');
        if (url) {
          imageToBase64(url).then(base64 => {
            img.src = base64;
          });
        }
      });
    });
  });
</script>

<div class="share-to-image-markdown">
  <NormalStyleContainer>
    <div
      class="container"
      id="{SHARE_TO_IMAGE_MARKDOWN_CONTAINER}"
      style="
				background-image: {$markdownMakeImageConfig.backgroundColor};
				padding: {$markdownMakeImageConfig.outerPadding}rem;
				width: {$markdownMakeImageConfig.pageSize / 2}px;
				font-family: {$markdownMakeImageConfig.fontFamily};
			">
      <div
        class="content"
        bind:this="{containerElement}"
        style="
					padding: 1rem {$markdownMakeImageConfig.innerPadding}rem;
					background-color: {pageBackground};
				">
        <div class="content-title">{title}</div>
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
        <img src="https://obsidian.md/images/obsidian-logo-text-white-purple.svg" alt="" class="bottom-icon" />
      </div>
    </div>
  </NormalStyleContainer>
  <div class="right share-to-image-markdown-text">
    <PageSetting containerElement="{containerElement}" />
    <button class="save-default-setting" on:click="{handlerSave}">Set as default settings</button>
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
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0 auto;
    border-radius: 6px;
    mask: linear-gradient(rgba(29, 31, 34, 0.8) 90%, transparent 100%);
    font-family: 'Wotfard', -apple-system, sans-serif;
  }
  .content {
    position: relative;
    background-color: var(--background-primary);
    margin: 0 auto;
    border-radius: 6px;
    box-shadow: 0px 1px 20px 8px #13121263;
  }
  .content-title {
    padding-bottom: 16px;
    border-bottom: var(--tab-outline-width) solid var(--tab-outline-color);
    font-weight: var(--inline-title-weight);
    font-size: var(--inline-title-size);
    line-height: var(--inline-title-line-height);
    font-style: var(--inline-title-style);
    font-variant: var(--inline-title-variant);
    font-family: var(--inline-title-font);
    letter-spacing: -0.015em;
    color: var(--inline-title-color);
  }
  .right {
    position: relative;
    width: 280px;
    min-width: 280px;
    height: calc(100% - 4rem);
    padding-bottom: 4rem;
    border-radius: 6px;
    border: var(--tab-outline-width) solid var(--tab-outline-color);
  }
  .save-default-setting {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .bottom-icon {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    width: 6rem;
  }
</style>
