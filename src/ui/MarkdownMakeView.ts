import { View, type WorkspaceLeaf } from 'obsidian';

export default class MarkdownMakeView extends View {
  private content: string;
  private contentElement: HTMLElement;

  constructor(leaf: WorkspaceLeaf, content?: string) {
    console.log('🚀 ~ file: MarkdownMakeView.ts:8 ~ MarkdownMakeView ~ constructor ~ content:', content);
    super(leaf);

    this.content = content || '';
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
    // 创建一个元素用于显示内容
    this.contentElement = document.createElement('div');
    this.contentElement.innerText = this.content;
    this.containerEl.appendChild(this.contentElement);
  }
}
