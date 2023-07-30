import type { CodeToImagePluginType, CodeImageSettings } from '@/types';
import type { ThemeKey } from '@/themes';

import { Setting, PluginSettingTab, type App } from 'obsidian';
import { BACKGROUND } from '@/constant/background';
import { ThemeOptions } from '@/themes';

export const DEFAULT_SETTINGS: CodeImageSettings = {
  theme: 'default',
  hasBackground: true,
  backgroundColor: BACKGROUND[0],
  windowControls: true,
  showLineNumber: false,
  hasWatermark: false,
  watermark: 'Obsidian',
  language: 'TEXT',
  fontSize: 14,
};

export default class SettingTab extends PluginSettingTab {
  plugins: CodeToImagePluginType;

  constructor(app: App, plugins: CodeToImagePluginType) {
    super(app, plugins);
    this.plugins = plugins;
  }

  async saveSettings(): Promise<void> {
    await this.plugins.saveData(this.plugins.settings);
  }

  async setTingChange<T extends keyof CodeImageSettings>(key: T, value: CodeImageSettings[T]) {
    this.plugins.settings[key] = value;
    await this.saveSettings();
  }

  async display() {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl('h2', { text: 'Code Copy As Image Setting' });

    new Setting(containerEl)
      .setName('Theme')
      .setDesc('set default theme')
      .addDropdown(options =>
        options
          .addOptions(ThemeOptions)
          .setValue(this.plugins.settings.theme)
          .onChange(async value => await this.setTingChange('theme', value as ThemeKey))
      );

    new Setting(containerEl)
      .setName('hasBackground')
      .setDesc('set whether the background exists ')
      .addToggle(value =>
        value
          .setValue(this.plugins.settings.hasBackground)
          .onChange(async val => await this.setTingChange('hasBackground', val))
      );

    new Setting(containerEl)
      .setName('WindowControls')
      .setDesc('set default has WindowControls')
      .addToggle(value =>
        value
          .setValue(this.plugins.settings.windowControls)
          .onChange(async value => await this.setTingChange('windowControls', value))
      );

    new Setting(containerEl)
      .setName('Line Numbers')
      .setDesc('set default has line numbers')
      .addToggle(value =>
        value
          .setValue(this.plugins.settings.showLineNumber)
          .onChange(async value => await this.setTingChange('showLineNumber', value))
      );

    new Setting(containerEl)
      .setName('Has Watermark')
      .setDesc('set default has has watermark')
      .addToggle(value =>
        value
          .setValue(this.plugins.settings.hasWatermark)
          .onChange(async value => await this.setTingChange('hasWatermark', value))
      );

    new Setting(containerEl)
      .setName('Watermark')
      .setDesc('set default watermark')
      .addText(text =>
        text
          .setPlaceholder('Enter your watermark')
          .setValue(this.plugins.settings.watermark)
          .onChange(async value => await this.setTingChange('watermark', value))
      );
  }
}
