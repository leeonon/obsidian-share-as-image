import type { Plugin } from 'obsidian';
import type { ThemeKey } from '@/themes';
import type { LanguageType } from '@/ui/Codemirror/lang';

export interface CodeToImagePluginType extends Plugin {
  settings: CodeImageSettings;
}

export interface CodeImageSettings {
  theme: ThemeKey;
  hasBackground: boolean;
  backgroundColor: string;
  windowControls: boolean;
  showLineNumber: boolean;
  hasWatermark: boolean;
  watermark: string;
  language: LanguageType;
  fontSize: string;
}
