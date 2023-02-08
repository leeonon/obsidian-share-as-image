<script lang="ts">
  import { BACKGROUND } from '@/constant/background';
  import { editConfig } from '@/store';

  let visible = false;

  function onChangeVisible() {
    visible = !visible;
  }

  function onChangeColor(color: string) {
    editConfig.update({ backgroundColor: color });
    onChangeVisible();
  }
</script>

<div class="ctj-edit_background_card">
  <!-- https://github.com/sveltejs/svelte/issues/8001 -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="ctj-edit_background_button"
    style="background-image: {$editConfig.backgroundColor}"
    on:click="{onChangeVisible}">
  </div>
  <div class="ctj-edit_background_list" class:visible="{visible}">
    <ul>
      {#each BACKGROUND as color, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li style="background-image: {color};" on:click="{() => onChangeColor(color)}"></li>
      {/each}
    </ul>
  </div>
</div>

<style lang="scss">
  .ctj-edit_background_card {
    position: relative;
  }

  .ctj-edit_background_button {
    width: 3rem;
    height: 1.8rem;
    cursor: pointer;
    border-radius: 6px;
  }

  .ctj-edit_background_list {
    position: absolute;
    top: calc(100% + 1rem);
    left: 50%;
    /* height: 0; */
    overflow: hidden;
    transform: translateX(-50%) scaleY(0);
    transform-origin: 0% 0%;
    transition: all 0.2s;
    z-index: 1;
    opacity: 0;

    &.visible {
      transform: translateX(-50%) scaleY(1);
      opacity: 1;
    }

    & > ul {
      width: 20rem;
      margin: 0;
      padding: 1rem;
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      list-style: none;
      background-color: #1e1e1e;
      border: 1px solid #313131;
      border-radius: 6px;
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
