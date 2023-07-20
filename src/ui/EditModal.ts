import type { LanguageType } from '@/ui/Codemirror/lang';
import type { CodeToImagePluginType, CodeImageSettings } from '@/types';

import { Modal, type App, Notice } from 'obsidian';
import EditModalContent from './EditModalContent.svelte';
import { toPng, toBlob, getFontEmbedCSS } from 'html-to-image';

export default class EditModal extends Modal {
  plugins: CodeToImagePluginType;
  modalContent: EditModalContent;
  lang: LanguageType;
  code: string;

  constructor(app: App, plugins: CodeToImagePluginType, lang: LanguageType, code: string) {
    super(app);

    this.plugins = plugins;
    this.lang = lang;
    this.code = code;
    this.initModal();
  }

  private getEditElement = () => {
    const ele = document.querySelector('#code-to-image-content') as HTMLDivElement;
    return ele;
  };

  private setDefaultSetting = async (settings: CodeImageSettings) => {
    await this.plugins.saveData({ ...this.plugins.settings, ...settings });
    new Notice('set default setting success');
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
    this.modalEl.addClass('shared-as-image-modal');

    this.modalContent = new EditModalContent({
      target: this.contentEl,
      props: {
        value: this.code,
        actions: {
          toPng: this.toPng,
          onCopyAsImage: this.onCopyAsImage,
          setDefaultSetting: this.setDefaultSetting,
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

  onCopyAsImage = async () => {
    const target = this.contentEl.querySelector('#ctj-edit_background') as HTMLElement;
    const css = await getFontEmbedCSS(target);
    console.log('🚀 ~ file: EditModal.ts:74 ~ EditModal ~ onCopyAsImage= ~ css:', css);
    const blob = await toBlob(target, {
      canvasHeight: target.clientHeight,
      canvasWidth: target.clientWidth,
    });
    if (blob) {
      new Notice('Copy As Image Success');
      window.navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    }
  };
}
