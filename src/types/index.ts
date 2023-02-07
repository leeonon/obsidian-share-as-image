import type { Plugin } from 'obsidian';

export interface CodeToImagePluginType extends Plugin {
  settings: CodeImageSettings;
}

export interface CodeImageSettings {
  theme: string;
  hasBackground: boolean;
  backgroundColor: string;
  isDarkMode: boolean;
  windowControls: boolean;
  barTitle: string;
  showLineNumber: boolean;
  hasWatermark: boolean;
  watermark: string;
}
