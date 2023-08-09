<script lang="ts">
  import BackgroundSetting from './BackgroundSetting.svelte';
  import { markdownMakeImageConfig } from '@/store';

  function onChangeFontSize() {}

  function onChangeFrontmatterVisible(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const visible = target.dataset.visible === 'display';
    markdownMakeImageConfig.update({
      frontmatter: {
        ...$markdownMakeImageConfig.frontmatter,
        visible,
      },
    });
  }

  function onChangeFrontmatterOptions(e: Event): void {
    const target = e.target as HTMLInputElement;
    markdownMakeImageConfig.update({
      frontmatter: {
        ...$markdownMakeImageConfig.frontmatter,
        [target.name]: target.checked,
      },
    });
  }
</script>

<div class="markdown-mask-setting">
  <div class="item">
    <div class="lable">Background</div>
    <div class="setting">
      <BackgroundSetting />
    </div>
  </div>
  <div class="item">
    <div class="lable">Frontmatter</div>
    <div class="setting setting-frontmatter-container">
      <div class="setting-frontmatter {$markdownMakeImageConfig.frontmatter.visible ? 'leftActive' : 'rightActive'}">
        <div class="setting-frontmatter-item" data-visible="display" on:click="{onChangeFrontmatterVisible}">
          Display
        </div>
        <div class="setting-frontmatter-item" data-visible="hide" on:click="{onChangeFrontmatterVisible}">Hide</div>
      </div>
      {#if $markdownMakeImageConfig.frontmatter.visible}
        <div class="setting-frontmatter-options">
          <div class="setting-frontmatter-options-item">
            <span>Created</span>
            <div class="checkbox-container" class:is-enabled="{$markdownMakeImageConfig.frontmatter.created}">
              <input
                name="created"
                type="checkbox"
                checked="{$markdownMakeImageConfig.frontmatter.created}"
                on:click="{onChangeFrontmatterOptions}" />
            </div>
          </div>
          <div class="setting-frontmatter-options-item">
            <span>Modified</span>
            <div class="checkbox-container" class:is-enabled="{$markdownMakeImageConfig.frontmatter.modified}">
              <input
                name="modified"
                type="checkbox"
                checked="{$markdownMakeImageConfig.frontmatter.modified}"
                on:click="{onChangeFrontmatterOptions}" />
            </div>
          </div>
          <div class="setting-frontmatter-options-item">
            <span>Author</span>
            <div class="checkbox-container" class:is-enabled="{$markdownMakeImageConfig.frontmatter.author}">
              <input
                name="author"
                type="checkbox"
                checked="{$markdownMakeImageConfig.frontmatter.author}"
                on:click="{onChangeFrontmatterOptions}" />
            </div>
          </div>
          <div class="setting-frontmatter-options-item">
            <span>Tags</span>
            <div class="checkbox-container" class:is-enabled="{$markdownMakeImageConfig.frontmatter.tags}">
              <input
                name="tags"
                type="checkbox"
                checked="{$markdownMakeImageConfig.frontmatter.tags}"
                on:click="{onChangeFrontmatterOptions}" />
            </div>
          </div>
        </div>
      {/if}
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
    <div class="lable">LetterSpacing</div>
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
  .setting-frontmatter-container {
    padding: 0.5rem;
    background-color: var(--background-modifier-form-field);
    border-radius: 6px;
    margin-top: 0.5rem;
    flex-direction: column;
  }
  .setting-frontmatter {
    position: relative;
    width: 100%;
    background-color: var(--background-modifier-form-field);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 0.5rem;

    &::before {
      content: '';
      position: absolute;
      top: 0px;
      left: 0px;
      width: 50%;
      height: 100%;
      border-radius: 6px;
      background-color: var(--background-modifier-hover);
      transition: all 0.15s ease-in-out;
    }

    &.leftActive::before {
      transform: translateX(0%);
    }
    &.rightActive::before {
      transform: translateX(100%);
    }
  }
  .setting-frontmatter-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    border-radius: 6px;
    cursor: pointer;
  }
  .setting-frontmatter-options {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .setting-frontmatter-options-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    border-top: 1px solid var(--background-modifier-border);
  }
</style>
