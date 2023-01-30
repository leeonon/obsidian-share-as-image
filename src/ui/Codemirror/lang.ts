import type { LanguageSupport } from '@codemirror/language';

import { rust } from '@codemirror/lang-rust';

export const langs = {
  text: rust(),
  js: rust(),
  jsx: rust(),
  ts: rust(),
  tsx: rust(),
  typescript: rust(),
  php: rust(),
  java: rust(),
  json: rust(),
  rust: rust(),
};

export type LanguageType = keyof typeof langs;

export const getLanguage = (type: LanguageType = 'text'): LanguageSupport => {
  return langs[type];
};
