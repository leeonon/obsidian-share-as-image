import type { CodeToImagePluginType, CodeImageSettings } from '@/types';

import '@babel/runtime/helpers/extends';
import { Plugin, MarkdownView, type WorkspaceLeaf } from 'obsidian';

import { codeBlockPostProcessor } from '@/postProcessor';
import SettingTab, { DEFAULT_SETTINGS } from '@/setting';
// import MarkdownModal from '@/ui/MarkdownModal';
import MarkdownMakeView from './ui/MarkdownMask/MarkdownMakeView';

export default class CodeToImagePlugin extends Plugin implements CodeToImagePluginType {
  settings: CodeImageSettings;
  view: MarkdownMakeView;

  async onload() {
    await this.loadSettings();

    this.addTransformCommand();

    this.addSettingTab(new SettingTab(this.app, this));

    /**
     * Init Code Block Post Processor
     */
    this.registerMarkdownPostProcessor((el, ctx) => {
      codeBlockPostProcessor(el, ctx, this.app, this);
    });
  }

  onunload() {}

  /**
   * @memberof CodeToImagePlugin
   */
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  addTransformCommand() {
    this.addCommand({
      id: 'share-to-image-transform',
      name: 'Share To Image Transform',
      callback: () => {
        const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (activeView) {
          const content = activeView.editor.getValue();
          const title = activeView.file.basename;
          if (content) {
            this.registerView('markdown-shared-as-image', (leaf: WorkspaceLeaf) => {
              this.view = new MarkdownMakeView(leaf, {
                content,
                title,
              });
              return this.view;
            });
            this.app.workspace.getLeaf().setViewState({
              type: 'markdown-shared-as-image',
              active: true,
            });
          }
        }
      },
    });
  }
}
