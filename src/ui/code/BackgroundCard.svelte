<script lang="ts">
  import { BACKGROUND } from '@/constant/background';
  import { editConfig } from '@/store';

  let visible = false;

  function onChangeVisible() {
    visible = !visible;
  }

  function onChangeColor(color: string) {
    editConfig.update({ backgroundColor: color });
  }
</script>

<div class="ctj-edit_background_card">
  <!-- https://github.com/sveltejs/svelte/issues/8001 -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <button
    class="ctj-edit_background_button"
    style="background-image: {$editConfig.backgroundColor}"
    on:click="{onChangeVisible}">
  </button>
  <div class="ctj-edit_background_list" class:visible="{visible}">
    <ul>
      {#each BACKGROUND as color, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li style="background-image: {color};">
          <button on:click="{() => onChangeColor(color)}"></button>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style lang="scss">
  .ctj-edit_background_card {
    position: relative;
  }

  .ctj-edit_background_button {
    width: 5rem;
    height: 2rem;
    cursor: pointer;
    border-radius: 6px;
  }

  .ctj-edit_background_list {
    position: absolute;
    top: 2.4rem;
    right: 0;
    padding: 1rem;
    overflow: hidden;
    transform: scaleY(0);
    transform-origin: 0% 0%;
    transition: all 0.2s;
    z-index: 1;
    opacity: 0;
    background-color: var(--color-base-20);
    box-shadow: 0 4px 16px var(--color-base-50);
    border-radius: 6px;

    &.visible {
      transform: scaleY(1);
      opacity: 1;
    }

    & > ul {
      width: 12rem;
      max-height: 20rem;
      margin: 0;
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      list-style: none;
      border-radius: 6px;
      max-height: 15rem;
      overflow-y: scroll;
      padding: 0;
      &::-webkit-scrollbar {
        width: 0;
      }
      & > li {
        flex: auto;
        height: 2.5rem;
        width: 3.5rem;
        border-radius: 6px;
        cursor: pointer;
      }
    }
  }
</style>
