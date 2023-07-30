import type { CodeToImagePluginType, CodeImageSettings } from '@/types';

import '@babel/runtime/helpers/extends';
import { Plugin } from 'obsidian';

import { codeBlockPostProcessor } from '@/postProcessor';
import SettingTab, { DEFAULT_SETTINGS } from '@/setting';

export default class CodeToImagePlugin extends Plugin implements CodeToImagePluginType {
  settings: CodeImageSettings;

  async onload() {
    await this.loadSettings();

    this.addSettingTab(new SettingTab(this.app, this));

    /**
     * Init
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
}
