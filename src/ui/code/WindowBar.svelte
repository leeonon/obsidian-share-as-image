<script lang="ts">
  import { editConfig } from '@/store';
</script>

<div class="ctj-edit_bar">
  <div class="ctj-edit_bar_mac">
    <span></span>
    <span></span>
    <span></span>
  </div>
  <!-- <div class="ctj-edit_bar_input">
    <input spellcheck="false" bind:value="{$editConfig.barTitle}" />
    {#if !$editConfig.barTitle}
      <span>Untitled</span>
    {/if}
  </div> -->
</div>

<style lang="scss">
  .ctj-edit_bar {
    position: relative;
    display: flex;
    gap: 1rem;
    padding: 1rem 1rem 0rem 1rem;
    align-items: center;
    background: transparent;

    &_mac {
      display: flex;
      gap: 0.5rem;
      & > span {
        display: inline-block;
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;

        &:nth-child(1) {
          background-color: #f04444;
        }
        &:nth-child(2) {
          background-color: #eab30a;
        }
        &:nth-child(3) {
          background-color: #22c55f;
        }
      }
    }

    // &_input {
    //   position: absolute;
    //   left: 0;
    //   width: 100%;
    //   height: 1rem;
    //   color: hsla(0, 0%, 100%, 0.3);
    //   font-size: 12px;
    //   font-weight: 500;
    //   letter-spacing: 0.32px;
    //   line-height: 12px;
    //   text-align: center;

    //   & > input {
    //     position: absolute;
    //     height: 100%;
    //     border: none;
    //     margin: 0;
    //     background-color: transparent;
    //     color: var(--frame-title-color);
    //     font-family: Inter, sans-serif;
    //     font-size: 12px;
    //     font-weight: 500;
    //     inset: 0;
    //     letter-spacing: 0.32px;
    //     line-height: 12px;
    //     text-align: center;
    //     outline: none;
    //     box-shadow: none;

    //     &:focus {
    //       & + span {
    //         display: none;
    //       }
    //     }
    //   }
    // }
  }
</style>
