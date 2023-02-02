import type { LanguageType } from '@/ui/Codemirror/lang';

import { Modal, type App, Notice } from 'obsidian';
import EditModalContent from './EditModalContent.svelte';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

export default class EditModal extends Modal {
  private modalContent: EditModalContent;
  private lang: LanguageType;
  private code: string;

  constructor(app: App, lang: LanguageType, code: string) {
    super(app);

    this.lang = lang;
    this.code = code;
    this.initModal();
  }

  private getEditElement = () => {
    const ele = document.querySelector('#code-to-image-content') as HTMLDivElement;
    return ele;
  };

  private toPng = () => {
    toPng(this.getEditElement())
      .then(dataUrl => {
        const img = new Image();
        img.src = dataUrl;
        new Notice('图片生成成功', 3000);
        this.getEditElement().appendChild(img);
      })
      .catch(() => {});
  };

  private initModal = () => {
    this.modalEl.addClass('code-to-image-modal');
    this.titleEl.innerText = 'CodeToImage';

    this.modalContent = new EditModalContent({
      target: this.contentEl,
      props: {
        lang: this.lang,
        value: this.code,
        actions: {
          toPng: this.toPng,
        },
      },
    });

    this.open();
  };

  public onOpen(): void {
    super.onOpen();
  }

  public onClose(): void {
    super.onClose();
    this.modalContent.$destroy();
  }
}
