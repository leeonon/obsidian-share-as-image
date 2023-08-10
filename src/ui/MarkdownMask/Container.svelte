<div class="share-markdown-image-normal-css">
  <slot />
</div>

<style lang="scss">
  .share-markdown-image-normal-css {
    display: flex;
    max-height: calc(100% - 4rem);
    overflow-x: hidden;
    overflow-y: overlay;
    user-select: text;
    margin: 0 auto;
    border-radius: 6px;

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      position: absolute;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #7f7f7f;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-track-piece:end {
      margin-bottom: 20px;
      background: transparent;
    }

    &::-webkit-scrollbar-track-piece:start {
      background: transparent;
    }

    :global(img) {
      width: 100%;
      border-radius: 6px;
    }
    :global(table) {
      width: 100%;
      border-collapse: collapse;
      border-radius: 6px;
      overflow: hidden;
    }
    :global(table thead tr) {
      font-weight: 500;
      height: 2rem;
      background-color: var(--color-base-30);
    }
    :global(table thead tr th) {
      padding: 0 1rem;
      text-align: left;
    }
    :global(table tbody tr) {
      border-bottom: 1px solid var(--color-base-30);
    }
    :global(table tbody tr td) {
      padding: 1rem;
    }
  }
</style>
