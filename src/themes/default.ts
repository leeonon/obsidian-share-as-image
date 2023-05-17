// https://github.com/uiwjs/react-codemirror/blob/master/themes/theme/src/index.tsx

import createTheme, { type Settings } from '@/utils/createTheme';
import { tags } from '@lezer/highlight';

const defaultSettings: Settings = {
  background: 'transparent',
  foreground: '#4D4D4C',
  caret: '#facc15',
  selection: '#1e293b80',
  selectionMatch: 'transparent',
  gutterBackground: 'transparent',
  gutterForeground: '#4D4D4C',
  gutterBorder: 'transparent',
  lineHighlight: 'transparent',
};

export const darkTheme = createTheme({
  theme: 'dark',
  settings: {
    ...defaultSettings,
    foreground: '#fff',
    gutterForeground: '#fff',
    selection: 'rgba(255,255,255,0.1)',
  },
  styles: [
    { tag: tags.keyword, color: '#4ff0ff' },
    { tag: tags.comment, color: '#94a3b8' },
    { tag: tags.bracket, color: '#ffc248' },
    { tag: tags.attributeName, color: '#d47dff' },
    { tag: tags.angleBracket, color: '#ffffff' },
    { tag: tags.variableName, color: '#ffffff' },
    { tag: tags.string, color: '#c0ff5b' },
    { tag: tags.number, color: '#ff808a' },
    { tag: tags.bool, color: '#ff808a' },
    { tag: tags.punctuation, color: '#4ff0ff' },
    { tag: tags.tagName, color: '#ff808a' },
    { tag: tags.squareBracket, color: '#ff808a' },
    { tag: tags.propertyName, color: '#d47dff' },
    { tag: tags.typeName, color: '#5cabff' },
  ],
});

export const color = {
  background: 'rgba(31, 41, 55, 0.8)',
};
