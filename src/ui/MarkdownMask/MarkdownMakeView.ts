import { View, type WorkspaceLeaf } from 'obsidian';
import MarkdownMaskContent from './MarkdownMaskContent.svelte';

type MarkdownMakeViewProps = {
  title: string;
  content: string;
};

export default class MarkdownMakeView extends View {
  private props: MarkdownMakeViewProps;

  constructor(leaf: WorkspaceLeaf, props: MarkdownMakeViewProps) {
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
    new MarkdownMaskContent({
      target: pageEle,
      props: {
        title: this.props.title,
        content: this.props.content,
      },
    });
  }
}
