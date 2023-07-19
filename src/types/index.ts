import type { Plugin } from 'obsidian';
import type { ThemeKey } from '@/themes';

export interface CodeToImagePluginType extends Plugin {
  settings: CodeImageSettings;
}

export interface CodeImageSettings {
  theme: ThemeKey;
  hasBackground: boolean;
  backgroundColor: string;
  windowControls: boolean;
  barTitle: string;
  showLineNumber: boolean;
  hasWatermark: boolean;
  watermark: string;
  language: string;
}
