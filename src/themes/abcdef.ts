/**
 * @name abcdef
 * @author codemirror.net
 * https://codemirror.net/5/theme/abcdef.css
 */
import { tags as t } from '@lezer/highlight';
import createTheme, { type Settings, type CreateThemeOptions } from '@/utils/createTheme';

export const defaultSettingsAbcdef: Settings = {
  background: '#0f0f0f',
  foreground: '#defdef',
  caret: '#00FF00',
  selection: '#515151',
  selectionMatch: '#515151',
  gutterBackground: '#555',
  gutterForeground: '#FFFFFF',
  lineHighlight: '#314151',
};

export const abcdefInit = (options?: Partial<CreateThemeOptions>) => {
  const { theme = 'dark', settings = {}, styles = [] } = options || {};
  return createTheme({
    theme: theme,
    settings: {
      ...defaultSettingsAbcdef,
      ...settings,
    },
    styles: [
      { tag: t.keyword, color: 'darkgoldenrod', fontWeight: 'bold' },
      { tag: t.atom, color: '#77F' },
      { tag: t.comment, color: '#7a7b7c', fontStyle: 'italic' },
      { tag: t.number, color: 'violet' },
      { tag: t.definition(t.variableName), color: '#fffabc' },
      { tag: t.variableName, color: '#abcdef' },
      { tag: t.function(t.variableName), color: '#fffabc' },
      { tag: t.typeName, color: '#FFDD44' },
      { tag: t.tagName, color: '#def' },
      { tag: t.string, color: '#2b4' },
      { tag: t.meta, color: '#C9F' },
      // { tag: t.qualifier, color: '#FFF700' },
      // { tag: t.builtin, color: '#30aabc' },
      { tag: t.bracket, color: '#8a8a8a' },
      { tag: t.attributeName, color: '#DDFF00' },
      { tag: t.heading, color: 'aquamarine', fontWeight: 'bold' },
      { tag: t.link, color: 'blueviolet', fontWeight: 'bold' },
      ...styles,
    ],
  });
};

export const abcdef = abcdefInit();
