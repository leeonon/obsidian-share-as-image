import { Modal, type App } from 'obsidian';

import MarkdownModalContent from './Content.svelte';

export default class MarkdownModal extends Modal {
  private modalContent: MarkdownModalContent;
  private content: string;

  constructor(app: App, content: string) {
    super(app);

    this.content = content;

    this.init();
  }

  init() {
    this.modalContent = new MarkdownModalContent({
      target: this.contentEl,
      props: {
        content: this.content,
      },
    });

    super.open();
  }

  onClose() {
    // ...
  }
}
