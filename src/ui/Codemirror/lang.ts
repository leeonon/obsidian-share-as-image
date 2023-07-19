import type { LanguageSupport } from '@codemirror/language';

import { rust } from '@codemirror/lang-rust';
import { cpp } from '@codemirror/lang-cpp';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';
import * as html from '@codemirror/lang-html';
import { java } from '@codemirror/lang-java';
import { php } from '@codemirror/lang-php';
import { python } from '@codemirror/lang-python';
import { sql } from '@codemirror/lang-sql';
import { markdown } from '@codemirror/lang-markdown';
import { vue } from '@codemirror/lang-vue';

export const langs = {
  TEXT: markdown(),
  JAVASCRIPT: javascript(),
  TYPESCRIPT: javascript({ typescript: true }),
  JSX: javascript({ jsx: true }),
  TSX: javascript({ jsx: true, typescript: true }),
  VUE: vue(),
  PHP: php(),
  JAVA: java(),
  JSON: json(),
  RUST: rust(),
  SQL: sql(),
  PYTHON: python(),
  HTML: html.html(),
  CSS: css(),
  CPP: cpp(),
};

export type LanguageType = keyof typeof langs;

export const getLanguage = (type: LanguageType = 'TEXT'): LanguageSupport => {
  const lang = langs[type];
  return lang || langs['TEXT'];
};
