import type { CodeToImagePluginType } from '@/types';
import { View, type WorkspaceLeaf, Notice } from 'obsidian';
import { get } from 'svelte/store';
import { markdownMakeImageConfig } from '@/store';
import PageContent from './Content.svelte';

export const MARKDOWN_MAKE_IMAGE_VIEW = 'markdown_make_image_view';

export default class MakePageView extends View {
  private plugin: CodeToImagePluginType;

  constructor(leaf: WorkspaceLeaf, plugins: CodeToImagePluginType) {
    super(leaf);

    this.plugin = plugins;
  }

  getViewType(): string {
    return MARKDOWN_MAKE_IMAGE_VIEW;
  }

  getDisplayText(): string {
    return 'Make Image';
  }

  getIcon(): string {
    return 'dice';
  }
  async saveData() {
    const storeSetting = get(markdownMakeImageConfig);
    await this.plugin.saveData({ ...this.plugin.settings, pageSettings: storeSetting });
    new Notice('set default setting success');
  }

  async onOpen() {
    const props = this.plugin.customParams;
    if (!props) {
      this.app.workspace.detachLeavesOfType(MARKDOWN_MAKE_IMAGE_VIEW);
      return;
    }
    // const pageEle = this.containerEl.attachShadow({ mode: 'open' });
    const { frontmatter, ...rest } = props;
    new PageContent({
      target: this.containerEl,
      props: {
        ...rest,
        app: this.app,
        frontmatter,
        parentComponent: this,
        containerElement: this.containerEl,
        handlerSave: this.saveData.bind(this),
      },
    });
  }

  // 视图卸载时
  async onClose() {
    // ...
  }
}
