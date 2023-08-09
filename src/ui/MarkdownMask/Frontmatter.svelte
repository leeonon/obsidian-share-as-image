<script lang="ts">
  export let author: string | undefined;
  export let created: string | undefined;
  export let modified: string | undefined;
  export let tags: string[] | undefined;
</script>

<div>
  {#if created}
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
          ><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line
          ><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M8 14h.01"
          ></path
          ><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"
          ></path
          ><path d="M16 18h.01"></path></svg>
      </span>
      <span class="content-frontmatter-label">Created</span>:&nbsp; {created}
    </div>
  {/if}
  {#if modified}
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
          ><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line
          ><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M8 14h.01"
          ></path
          ><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"
          ></path
          ><path d="M16 18h.01"></path></svg>
      </span>
      <span class="content-frontmatter-label">Modified</span>:&nbsp; {modified}
    </div>
  {/if}
  {#if author}
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
          ><path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path><rect x="3" y="4" width="18" height="18" rx="2"></rect
          ><circle cx="12" cy="10" r="2"></circle><line x1="8" y1="2" x2="8" y2="4"></line><line
            x1="16"
            y1="2"
            x2="16"
            y2="4"></line
          ></svg
        ></span>
      <span class="content-frontmatter-label">Author</span>:&nbsp; {author}
    </div>
  {/if}
  {#if tags}
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
      <span class="content-frontmatter-label">Tag</span>:&nbsp;
      {#each tags as tag}
        <span class="content-frontmatter-tag">{tag}</span>
      {/each}
    </div>
  {/if}
</div>

<style>
  .content-frontmatter {
    --icon-size: 14px;
    display: flex;
    align-items: center;
    padding: 4px 0;
    color: var(--text-muted);
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
    color: var(--text-faint);
    font-weight: 500;
  }
  .content-frontmatter-tag {
    border-radius: 15px;
    background-color: var(--tag-background);
    border: var(--tag-border-width) solid var(--tag-border-color);
    border-radius: var(--tag-radius);
    color: var(--tag-color);
    font-size: var(--tag-size);
    text-decoration: var(--tag-decoration);
    padding: var(--tag-padding-y) var(--tag-padding-x);
    line-height: 1;
    font-size: 12px;
    margin-left: 6px;
  }
</style>
