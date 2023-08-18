import { View, type WorkspaceLeaf } from 'obsidian';
import MarkdownMaskContent, { type MarkdownMaskContentProps } from './Content.svelte';

type MarkdownMakeViewType = Omit<MarkdownMaskContentProps, 'parentComponent'>;

export default class MarkdownMakeView extends View {
  private props: MarkdownMakeViewType;

  constructor(leaf: WorkspaceLeaf, props: MarkdownMakeViewType) {
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
    const pageEle = this.containerEl.attachShadow({ mode: 'open' });
    const { frontmatter, ...rest } = this.props;
    new MarkdownMaskContent({
      target: pageEle,
      props: {
        ...rest,
        app: this.app,
        frontmatter,
        parentComponent: this,
        containerElement: pageEle,
      },
    });
  }
}
