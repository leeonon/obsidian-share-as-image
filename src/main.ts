import type { CodeToImagePluginType, CodeImageSettings } from '@/types';

import { Plugin } from 'obsidian';

import { codeBlockPostProcessor } from '@/postProcessor';
import SettingTab, { DEFAULT_SETTINGS } from '@/setting';
import store from '@/store';

export default class CodeToImagePlugin extends Plugin implements CodeToImagePluginType {
  settings: CodeImageSettings;

  async onload() {
    await this.loadSettings();

    this.addSettingTab(new SettingTab(this.app, this));

    /**
     * Init
     */
    this.registerMarkdownPostProcessor((el, ctx) => {
      // TODO change position
      store.editConfig.set(this.settings);

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
}
