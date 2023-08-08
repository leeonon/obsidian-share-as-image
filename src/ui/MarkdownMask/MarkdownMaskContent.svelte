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
  import MarkdownMaskSetting from './MarkdownMaskSetting.svelte';
  import NormalStyleContainer from './NormalStyleContainer.svelte';

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
        {#if frontmatter?.created}
          <div class="content-frontmatter">
            <span class="content-frontmatter-icon">
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
                class="svg-icon lucide-calendar-days"
                ><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"
                ></line
                ><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path
                  d="M8 14h.01"></path
                ><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"
                ></path
                ><path d="M16 18h.01"></path></svg>
            </span>
            <span class="content-frontmatter-label">Created</span>:&nbsp; {frontmatter.created}
          </div>
        {/if}
        {#if frontmatter?.modified}
          <div class="content-frontmatter">
            <span class="content-frontmatter-icon">
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
                class="svg-icon lucide-calendar-days"
                ><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"
                ></line
                ><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path
                  d="M8 14h.01"></path
                ><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"
                ></path
                ><path d="M16 18h.01"></path></svg>
            </span>
            <span class="content-frontmatter-label">Modified</span>:&nbsp; {frontmatter.modified}
          </div>
        {/if}
        {#if frontmatter?.author}
          <div class="content-frontmatter">
            <span class="content-frontmatter-icon"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="svg-icon lucide-contact"
                ><path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path><rect x="3" y="4" width="18" height="18" rx="2"
                ></rect
                ><circle cx="12" cy="10" r="2"></circle><line x1="8" y1="2" x2="8" y2="4"></line><line
                  x1="16"
                  y1="2"
                  x2="16"
                  y2="4"></line
                ></svg
              ></span>
            <span class="content-frontmatter-label">Author</span>:&nbsp; {frontmatter.author}
          </div>
        {/if}
        {#if frontmatter?.tags}
          <div class="content-frontmatter">
            <span class="content-frontmatter-icon">
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
                class="svg-icon lucide-tags"
                ><path d="M9 5H2v7l6.29 6.29c.94.94 2.48.94 3.42 0l3.58-3.58c.94-.94.94-2.48 0-3.42L9 5Z"></path><path
                  d="M6 9.01V9"></path
                ><path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19"></path></svg>
            </span>
            <span class="content-frontmatter-label">Author</span>:&nbsp;
            {#each frontmatter.tags as tag}
              <span class="content-frontmatter-tag">{tag}</span>
            {/each}
          </div>
        {/if}
        <div
          bind:this="{element}"
          style="
						font-size: {$markdownMakeImageConfig.fontSize}px;
						line-height: {$markdownMakeImageConfig.lineHeight};
						word-spacing: {$markdownMakeImageConfig.wordSpacing === 0 ? `norma;` : `${$markdownMakeImageConfig.wordSpacing}px`};
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
    -webkit-mask: linear-gradient(rgba(29, 31, 34, 0.8) 78%, transparent 100%);
  }
  .content {
    max-width: 800px;
    background-color: var(--background-primary);
    margin: 0 auto;
    padding: 1rem 3rem;
    border-radius: 6px;
    color: var(--drag-ghost-text-color);
    box-shadow: 0px 1px 20px 8px #13121263;
  }
  .content-title {
    padding-bottom: 16px;
    border-bottom: var(--tab-outline-width) solid var(--tab-outline-color);
  }
  .content-frontmatter {
    --icon-size: 14px;
    display: flex;
    align-items: center;
    padding: 4px 0;
    color: rgba(244, 244, 244, 0.9);
    font-weight: 400;
  }
  .content-frontmatter-icon {
    display: flex;
    align-items: center;
  }
  :global(.content-frontmatter-icon > svg) {
    width: 14px;
    height: 14px;
    margin-right: 4px;
  }
  .content-frontmatter-label {
    width: 66px;
    color: rgba(244, 244, 244, 0.5);
    font-weight: 500;
  }
  .content-frontmatter-tag {
    padding: 2px 8px;
    border-radius: 15px;
    background-color: rgba(83, 81, 195, 0.5);
    font-size: 12px;
    margin-right: 10px;
  }
  .left {
    width: 350px;
    height: calc(100% - 4rem);
    margin-left: auto;
    border-radius: 6px;
    border: var(--tab-outline-width) solid var(--tab-outline-color);
  }
</style>
