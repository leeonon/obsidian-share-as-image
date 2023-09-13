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

export interface MarkdownMaskImageSettings {
  backgroundColor: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  color: string;
  outerPadding: number;
  innerPadding: number;
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
