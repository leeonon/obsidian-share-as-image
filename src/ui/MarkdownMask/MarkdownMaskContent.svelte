<script lang="ts">
  import { Component, MarkdownRenderer } from 'obsidian';
  import { onMount } from 'svelte';
  import { markdownMakeImageConfig } from '@/store';
  import MarkdownMaskSetting from './MarkdownMaskSetting.svelte';

  export let title: string;
  export let content: string;

  let element: HTMLDivElement;

  onMount(() => {
    const a = new Component();
    MarkdownRenderer.renderMarkdown(content, element, '/', a);
  });
</script>

<div class="share-to-image-markdown">
  <div class="container" style="background-image: {$markdownMakeImageConfig.backgroundColor}">
    <div
      class="content"
      style="
				font-size: {$markdownMakeImageConfig.fontSize}px;
				line-height: {$markdownMakeImageConfig.lineHeight};
				color: {$markdownMakeImageConfig.color};
			">
      <h1 class="content-title">{title}</h1>
      <div bind:this="{element}"></div>
    </div>
  </div>
  <div class="left">
    <MarkdownMaskSetting />
  </div>
</div>

<style lang="scss">
  .share-to-image-markdown {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .container {
      flex: 1;
      display: flex;
      flex-direction: column;
      height: calc(100% - 2rem);
      margin: 0 1rem;
      padding: 3rem;
      /* background-image: linear-gradient(rgb(222, 65, 41), rgb(234, 175, 66)); */
      border: var(--tab-outline-width) solid var(--tab-outline-color);
      border-radius: 6px;
      overflow-x: hidden;
      overflow-y: overlay;
      user-select: text;
      -webkit-mask: linear-gradient(rgba(29, 31, 34, 0.8) 78%, transparent 100%);
    }
    .content {
      max-width: 800px;
      background-color: var(--background-primary);
      margin: 2rem auto;
      padding: 3rem;
      border-radius: 6px;
      color: var(--drag-ghost-text-color);
      box-shadow: 0px 1px 20px 8px #13121263;
    }

    .left {
      width: 350px;
      height: calc(100% - 4rem);
      border-radius: 6px;
      border: var(--tab-outline-width) solid var(--tab-outline-color);
    }
  }
</style>
