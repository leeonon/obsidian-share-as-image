<script lang="ts">
  import type { TextStyleType } from '@/constant';
  import { markdownMakeImageConfig } from '@/store';
  import BackgroundSetting from './BackgroundSetting.svelte';
  import TextStyle from './TextStyle.svelte';

  /**
   * Whether any text is selected
   */
  export let selection: Selection | null;

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
  function setFontBold() {}
</script>

<div class="markdown-mask-setting">
  <div class="setting-buttons">
    <div class="setting-buttons-item">
      <div class="setting-buttons-item-background">
        <div></div>
      </div>
      <div class="setting-buttons-item-text">Copy</div>
    </div>
    <div class="setting-buttons-item">
      <div class="setting-buttons-item-background">
        <div></div>
      </div>
      <div class="setting-buttons-item-text">Download</div>
    </div>
  </div>
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
  <div class="item">
    <div class="lable">Text Color</div>
    <div class="setting">
      <TextStyle selection="{selection}" />
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

  .setting-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75em 0;
    border-bottom: 1px solid var(--background-modifier-border);
  }
  .setting-buttons-item {
    position: relative;
    cursor: pointer;
  }
  .setting-buttons-item-background {
    width: calc(100% + 0.25rem);
    position: absolute;
    left: -0.125rem;
    filter: blur(2px);
    border-radius: 0.5rem;
    z-index: -1;
    top: -0.125rem;
    height: calc(100% + 0.25rem);
    overflow: hidden;
  }
  .setting-buttons-item-background > div {
    position: absolute;
    background-image: conic-gradient(
      from 180deg at 50% 50%,
      #3fdcf7 0deg,
      #1890ff 51.43deg,
      #6813cb 102.86deg,
      #ff003d 154.29deg,
      #ff8a00 205.71deg,
      #ffd600 257.14deg,
      #67be23 308.57deg,
      #3fdcf7 1turn
    );
    width: 125%;
    height: auto;
    aspect-ratio: 1/1;
    top: -83%;
    left: -12.5%;

    animation: identifier 5s linear infinite;

    @keyframes identifier {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
  .setting-buttons-item-text {
    padding: 0.5rem 1.5rem;
    border-radius: 6px;
    background-color: var(--background-primary-alt);
    transition: all 0.15s;

    &:hover {
      background-color: var(--background-primary);
    }
  }
</style>
