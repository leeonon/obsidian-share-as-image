<script lang="ts">
  import { MarkdownRenderer } from 'obsidian';
  import { onMount } from 'svelte';

  export let content: string;

  let element: HTMLDivElement;

  onMount(() => {
    MarkdownRenderer.renderMarkdown(content, element, '/', this);
  });
</script>

<div class="share-to-image-markdown">
  <div></div>
  <div bind:this="{element}"></div>
</div>
