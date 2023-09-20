import type { Plugin } from 'obsidian';
import type { ThemeKey } from '@/themes';
import type { LanguageType } from '@/ui/code/Codemirror/lang';

export interface CodeToImagePluginType extends Plugin {
  settings: {
    codeSettings: CodeImageSettings;
    pageSettings: PageImageSettings;
  };
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

export interface PageImageSettings {
  backgroundColor: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  color: string;
  outerPadding: number;
  innerPadding: number;
  pageSize: number;
  pageOpacity: number;
  /**
   * Control whether frontmatter is displayed and which attributes are displayed.
   */
  frontmatter: {
    visible: boolean;
    created: boolean;
    modified: boolean;
    author: boolean;
    tags: boolean;
  };
}
