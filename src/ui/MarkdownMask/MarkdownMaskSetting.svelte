<script lang="ts">
  import BackgroundSetting from './BackgroundSetting.svelte';
  import { markdownMakeImageConfig } from '@/store';

  function onChangeFontSize() {}
</script>

<div class="markdown-mask-setting">
  <div class="item">
    <div class="lable">Background</div>
    <div class="setting">
      <BackgroundSetting />
    </div>
  </div>
  <div class="item">
    <div class="lable">FontSize</div>
    <div class="setting">
      <input
        class="slider setting-font-size"
        bind:value="{$markdownMakeImageConfig.fontSize}"
        type="range"
        min="12"
        max="28"
        step="1" />
      <span>{$markdownMakeImageConfig.fontSize}</span>
    </div>
  </div>
  <div class="item">
    <div class="lable">LineHeight</div>
    <div class="setting">
      <input
        class="slider setting-font-size"
        bind:value="{$markdownMakeImageConfig.lineHeight}"
        type="range"
        min="0.5"
        max="3"
        step="0.1" />
      <span>{$markdownMakeImageConfig.lineHeight}</span>
    </div>
  </div>
  <div class="item">
    <div class="lable">letterSpacing</div>
    <div class="setting">
      <input
        class="slider setting-font-size"
        bind:value="{$markdownMakeImageConfig.letterSpacing}"
        type="range"
        min="0"
        max="5"
        step="0.2" />
      <span>{$markdownMakeImageConfig.letterSpacing}</span>
    </div>
  </div>
  <div class="item">
    <div class="lable">wordSpacing</div>
    <div class="setting">
      <input
        class="slider setting-font-size"
        bind:value="{$markdownMakeImageConfig.wordSpacing}"
        type="range"
        min="0"
        max="5"
        step="0.2" />
      <span>{$markdownMakeImageConfig.wordSpacing}</span>
    </div>
  </div>
</div>

<style lang="scss">
  .markdown-mask-setting {
    display: flex;
    flex-direction: column;
    padding: 1rem;

    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0.75em 0;
      border-bottom: 1px solid var(--background-modifier-border);
      .lable {
        color: var(--text-normal);
        font-size: var(--font-ui-medium);
        line-height: var(--line-height-tight);
      }
      .setting {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.1rem;
      }
      .setting-font-size {
        width: 100%;
      }
    }
  }
</style>
