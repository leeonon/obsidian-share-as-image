import type { LanguageType } from '@/ui/code/Codemirror/lang';
import type { CodeToImagePluginType, CodeImageSettings } from '@/types';

import { Modal, type App, Notice } from 'obsidian';
import EditModalContent from './EditModalContent.svelte';
import { toPng } from 'html-to-image';
import { onCopyImage, downloadImage } from '@/utils';

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
        this.getEditElement().appendChild(img);
      })
      .catch(() => {});
  };

  private onExport = async () => {
    const target = this.contentEl.querySelector('#ctj-edit_background') as HTMLElement;
    await downloadImage(target);
  };

  private initModal = () => {
    this.modalEl.addClass('shared-as-image-modal');

    this.modalContent = new EditModalContent({
      target: this.contentEl,
      props: {
        value: this.code,
        actions: {
          onExport: this.onExport,
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
    await onCopyImage(target);
  };
}
