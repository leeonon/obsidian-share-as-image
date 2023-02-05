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

  async display() {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl('h2', { text: 'Code To Image Setting' });

    new Setting(containerEl)
      .setName('Watermark')
      .setDesc('set default watermark')
      .addText(text =>
        text
          .setPlaceholder('Enter your watermark')
          .setValue(this.plugin.settings.watermark)
          .onChange(async value => {
            this.plugin.settings.watermark = value;
            await this.saveSettings();
          })
      );
  }
}
