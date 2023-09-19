<script lang="ts">
  import { IMAGE_SIZE, SHARE_TO_IMAGE_MARKDOWN_CONTAINER } from '@/constant';
  import { markdownMakeImageConfig } from '@/store';
  import { downloadImage, handlerCopyImage } from '@/utils';
  import BackgroundSetting from './BackgroundSetting.svelte';
  import RangeSettingItem from '../components/RangeSettingItem.svelte';
  import TextStyle from './TextStyle.svelte';
  import CollapseSettingItem from '../components/CollapseSettingItem.svelte';
  import FontSetting from '../components/FontSetting.svelte';

  /**
   * Whether any text is selected
   */
  export let selection: Selection | null;

  const frontmatterConfigArray = Object.keys($markdownMakeImageConfig.frontmatter).filter(v => v !== 'visible');

  $: frontmatterConfig = $markdownMakeImageConfig.frontmatter as any;

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

  function onDownloadImage() {
    downloadImage(document.querySelector(`#${SHARE_TO_IMAGE_MARKDOWN_CONTAINER}`) as HTMLElement);
  }

  function onCopyImage() {
    handlerCopyImage(document.querySelector(`#${SHARE_TO_IMAGE_MARKDOWN_CONTAINER}`) as HTMLElement);
  }
</script>

<div class="markdown-page-setting">
  <div class="setting-buttons">
    <div class="setting-buttons-item" on:click="{onCopyImage}">
      <div class="setting-buttons-item-background">
        <div></div>
      </div>
      <div class="setting-buttons-item-text">Copy</div>
    </div>
    <div class="setting-buttons-item" on:click="{onDownloadImage}">
      <div class="setting-buttons-item-background">
        <div></div>
      </div>
      <div class="setting-buttons-item-text">Download</div>
    </div>
  </div>
  <CollapseSettingItem label="Background">
    <span slot="extra" class="background-selected-item" style="background: {$markdownMakeImageConfig.backgroundColor};"
    ></span>
    <BackgroundSetting />
  </CollapseSettingItem>
  <RangeSettingItem
    label="PageOpacity"
    bind:value="{$markdownMakeImageConfig.pageOpacity}"
    type="range"
    min="0.5"
    max="1"
    step="0.05" />
  <div class="item">
    <div class="label">Frontmatter</div>
    <div class="setting setting-frontmatter-container">
      <div class="setting-frontmatter {$markdownMakeImageConfig.frontmatter.visible ? 'leftActive' : 'rightActive'}">
        <div class="setting-frontmatter-item" data-visible="display" on:click="{onChangeFrontmatterVisible}">
          Display
        </div>
        <div class="setting-frontmatter-item" data-visible="hide" on:click="{onChangeFrontmatterVisible}">Hide</div>
      </div>
      {#if $markdownMakeImageConfig.frontmatter.visible}
        <div class="setting-frontmatter-options">
          {#each frontmatterConfigArray as key}
            <div class="setting-frontmatter-options-item">
              <span>{key}</span>
              <div class="checkbox-container" class:is-enabled="{frontmatterConfig[key]}">
                <input
                  name="{key}"
                  type="checkbox"
                  checked="{frontmatterConfig[key]}"
                  on:click="{onChangeFrontmatterOptions}" />
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
  <RangeSettingItem
    label="FontSize"
    bind:value="{$markdownMakeImageConfig.fontSize}"
    type="range"
    min="12"
    max="28"
    step="1" />
  <RangeSettingItem
    label="LineHeight"
    bind:value="{$markdownMakeImageConfig.lineHeight}"
    type="range"
    min="1"
    max="3"
    step="0.1" />
  <RangeSettingItem
    label="LetterSpacing"
    bind:value="{$markdownMakeImageConfig.letterSpacing}"
    type="range"
    min="0"
    max="5"
    step="0.1" />
  <RangeSettingItem
    label="OuterPadding"
    bind:value="{$markdownMakeImageConfig.outerPadding}"
    type="range"
    min="0"
    max="3"
    step="0.1" />
  <RangeSettingItem
    label="InnerPadding"
    bind:value="{$markdownMakeImageConfig.innerPadding}"
    type="range"
    min="1"
    max="3"
    step="0.1" />
  <div class="item item-horizontal">
    <div class="label">PageSize</div>
    <div class="setting select">
      <select class="dropdown cti-select-dropdown" name="fontSize" bind:value="{$markdownMakeImageConfig.pageSize}">
        {#each IMAGE_SIZE as size (size)}
          <option value="{size.value}">{size.name}</option>
        {/each}
      </select>
    </div>
  </div>
  <FontSetting />
  <CollapseSettingItem label="TextStyle">
    <TextStyle selection="{selection}" />
  </CollapseSettingItem>
</div>

<style lang="scss">
  .markdown-page-setting {
    max-height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    overflow-x: hidden;
    overflow-y: overlay;
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
  }
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.75em 0;
    border-bottom: 1px solid var(--background-modifier-border);
    &.item-horizontal {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0.3rem 0;
    }
    .label {
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
    .setting.select {
      max-width: 60%;
      margin: 0.5rem 0;
    }
  }
  .background-selected-item {
    display: inline-block;
    width: 3rem;
    height: 1rem;
    border-radius: 4px;
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
