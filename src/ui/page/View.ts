import { View, type WorkspaceLeaf } from 'obsidian';
import PageContent, { type PageContentProps } from './Content.svelte';

type PageViewType = Omit<PageContentProps, 'parentComponent'>;

export default class MakePageView extends View {
  private props: PageViewType;

  constructor(leaf: WorkspaceLeaf, props: PageViewType) {
    super(leaf);

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
      },
    });
  }
}
