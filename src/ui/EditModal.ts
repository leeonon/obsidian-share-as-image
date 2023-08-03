import type { LanguageType } from '@/ui/Codemirror/lang';
import type { CodeToImagePluginType, CodeImageSettings } from '@/types';

import { Modal, type App, Notice } from 'obsidian';
import EditModalContent from './EditModalContent.svelte';
import { toPng, toBlob } from 'html-to-image';

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

  private blobToBuffer = (blob: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(new Uint8Array(reader.result as ArrayBuffer));
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });
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
    // @ts-ignore
    const result = await window.electron.remote.dialog.showSaveDialog(this.electronWindow, {
      title: 'Export Image',
      defaultPath: `obsidian-share-image-${Date.now()}.png`,
      filters: [{ name: '', extensions: ['png'] }],
    });
    if (result.canceled) return;

    const target = this.contentEl.querySelector('#ctj-edit_background') as HTMLElement;
    const path = result.filePath;
    const blob = await toBlob(target, {
      canvasHeight: target.clientHeight,
      canvasWidth: target.clientWidth,
      pixelRatio: 2,
    });
    if (blob) {
      const buffer = await this.blobToBuffer(blob);
      try {
        // @ts-ignore
        await this.app.vault.adapter.fs.writeFileSync(path, buffer);
        // @ts-ignore
        await window.electron.remote.shell.showItemInFolder(path);
        new Notice('Export Image Success', 3000);
      } catch (error) {
        new Notice('Export Image Failed', 3000);
      }
    }
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
    // const fontCss = `@font-face {font-family: Comic Mono;font-weight: normal;src: url(https://cdn.jsdelivr.net/npm/comic-mono@0.0.1/ComicMono.ttf);}`;
    const blob = await toBlob(target, {
      canvasHeight: target.clientHeight,
      canvasWidth: target.clientWidth,
      pixelRatio: 2,
    });
    if (blob) {
      new Notice('Copy As Image Success');
      window.navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    }
  };
}
