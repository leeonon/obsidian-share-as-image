import type { CodeToImagePluginType } from '@/types';
import { View, type WorkspaceLeaf, Notice } from 'obsidian';
import { get } from 'svelte/store';
import { markdownMakeImageConfig } from '@/store';
import PageContent, { type PageContentProps } from './Content.svelte';

type PageViewType = Omit<PageContentProps, 'parentComponent'>;

export default class MakePageView extends View {
  private props: PageViewType;
  private plugins: CodeToImagePluginType;

  constructor(leaf: WorkspaceLeaf, plugins: CodeToImagePluginType, props: PageViewType) {
    super(leaf);

    this.plugins = plugins;
    this.props = props;
  }

  getViewType(): string {
    return 'markdown-shared-as-image';
  }

  getDisplayText(): string {
    return 'Make Image';
  }

  getIcon(): string {
    return 'dice';
  }
  async saveData() {
    const storeSetting = get(markdownMakeImageConfig);
    await this.plugins.saveData({ ...this.plugins.settings, pageSettings: storeSetting });
    new Notice('set default setting success');
  }

  async onOpen() {
    // const pageEle = this.containerEl.attachShadow({ mode: 'open' });
    const { frontmatter, ...rest } = this.props;
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
}
