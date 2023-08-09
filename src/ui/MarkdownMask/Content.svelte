<script context="module" lang="ts">
  export type MarkdownMaskContentProps = {
    title: string;
    content: string;
    frontmatter?: {
      author?: string;
      created?: string;
      modified?: string;
      tags?: string[];
    };
  };
</script>

<script lang="ts">
  import { Component, MarkdownRenderer } from 'obsidian';
  import { onMount } from 'svelte';
  import { markdownMakeImageConfig } from '@/store';
  import MarkdownMaskSetting from './Setting.svelte';
  import NormalStyleContainer from './Container.svelte';
  import Frontmatter from './Frontmatter.svelte';

  export let title: MarkdownMaskContentProps['title'];
  export let content: MarkdownMaskContentProps['content'];
  export let frontmatter: MarkdownMaskContentProps['frontmatter'];

  let element: HTMLDivElement;

  onMount(() => {
    MarkdownRenderer.renderMarkdown(content, element, '/', new Component());
  });
</script>

<div class="share-to-image-markdown">
  <NormalStyleContainer>
    <div class="container" style="background-image: {$markdownMakeImageConfig.backgroundColor}">
      <div class="content">
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
    <MarkdownMaskSetting />
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
    padding: 3rem;
    border-radius: 6px;
    -webkit-mask: linear-gradient(rgba(29, 31, 34, 0.8) 90%, transparent 100%);
  }
  .content {
    max-width: 800px;
    background-color: var(--background-primary);
    margin: 0 auto;
    padding: 1rem 3rem;
    border-radius: 6px;
    box-shadow: 0px 1px 20px 8px #13121263;
  }
  .content-title {
    padding-bottom: 16px;
    border-bottom: var(--tab-outline-width) solid var(--tab-outline-color);
  }
  .left {
    width: 350px;
    height: calc(100% - 4rem);
    margin-left: auto;
    border-radius: 6px;
    border: var(--tab-outline-width) solid var(--tab-outline-color);
  }
</style>
