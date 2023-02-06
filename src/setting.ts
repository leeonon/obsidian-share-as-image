import type { CodeToImagePluginType, CodeImageSettings } from '@/types';
import { Setting, PluginSettingTab, type App } from 'obsidian';

export const DEFAULT_SETTINGS: CodeImageSettings = {
  theme: 'OneDark3',
  hasBackground: true,
  isDarkMode: true,
  windowControls: true,
  barTitle: '',
  showLineNumber: false,
  hasWatermark: false,
  watermark: 'Obsidian',
};

export default class SettingTab extends PluginSettingTab {
  plugin: CodeToImagePluginType;

  constructor(app: App, plugins: CodeToImagePluginType) {
    super(app, plugins);
    this.plugin = plugins;
  }

  async saveSettings(): Promise<void> {
    await this.plugin.saveData(this.plugin.settings);
  }

  async setTingChange<T extends keyof CodeImageSettings>(key: T, value: CodeImageSettings[T]) {
    this.plugin.settings[key] = value;
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
          .addOptions({
            onDarkTheme: 'onDarkTheme',
            onDarkTheme2: 'onDarkTheme2',
            OneDark3: 'OneDark3',
          })
          .setValue(this.plugin.settings.theme)
          .onChange(async value => await this.setTingChange('theme', value))
      );

    new Setting(containerEl)
      .setName('hasBackground')
      .setDesc('set whether the background exists ')
      .addToggle(value =>
        value
          .setValue(this.plugin.settings.hasBackground)
          .onChange(async val => await this.setTingChange('hasBackground', val))
      );

    new Setting(containerEl)
      .setName('DarkMode')
      .setDesc('set default is dark modal')
      .addToggle(value =>
        value
          .setValue(this.plugin.settings.isDarkMode)
          .onChange(async value => await this.setTingChange('isDarkMode', value))
      );

    new Setting(containerEl)
      .setName('WindowControls')
      .setDesc('set default has WindowControls')
      .addToggle(value =>
        value
          .setValue(this.plugin.settings.windowControls)
          .onChange(async value => await this.setTingChange('windowControls', value))
      );

    new Setting(containerEl)
      .setName('Title')
      .setDesc('set default title')
      .addText(text =>
        text
          .setPlaceholder('Enter your title')
          .setValue(this.plugin.settings.barTitle)
          .onChange(async value => await this.setTingChange('barTitle', value))
      );

    new Setting(containerEl)
      .setName('Line Numbers')
      .setDesc('set default has line numbers')
      .addToggle(value =>
        value
          .setValue(this.plugin.settings.showLineNumber)
          .onChange(async value => await this.setTingChange('showLineNumber', value))
      );

    new Setting(containerEl)
      .setName('Has Watermark')
      .setDesc('set default has has watermark')
      .addToggle(value =>
        value
          .setValue(this.plugin.settings.hasWatermark)
          .onChange(async value => await this.setTingChange('hasWatermark', value))
      );

    new Setting(containerEl)
      .setName('Watermark')
      .setDesc('set default watermark')
      .addText(text =>
        text
          .setPlaceholder('Enter your watermark')
          .setValue(this.plugin.settings.watermark)
          .onChange(async value => await this.setTingChange('watermark', value))
      );
  }
}
