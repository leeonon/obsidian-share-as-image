import { createTheme, type Settings, type CreateThemeOptions } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';

const chalky = '#e5c07b',
  coral = '#e06c75',
  cyan = '#56b6c2',
  invalid = '#ffffff',
  ivory = '#abb2bf',
  stone = '#7d8799', // Brightened compared to original to increase contrast
  malibu = '#61afef',
  sage = '#98c379',
  whiskey = '#d19a66',
  violet = '#c678dd',
  darkBackground = '#21252b',
  highlightBackground = '#2c313a',
  background = '#282c34',
  tooltipBackground = '#353a42',
  selection = '#3E4451',
  cursor = '#528bff';

export const color = {
  chalky,
  coral,
  cyan,
  invalid,
  ivory,
  stone,
  malibu,
  sage,
  whiskey,
  violet,
  darkBackground,
  highlightBackground,
  background,
  tooltipBackground,
  selection,
  cursor,
};

const defaultSettings: Settings = {
  background: color.background,
  caret: color.cursor,
  selection: color.selection,
};

export const oneDarkInit = (options?: Partial<CreateThemeOptions>) => {
  const { theme = 'dark', settings = {} } = options || {};
  return createTheme({
    theme,
    settings: {
      ...defaultSettings,
      ...settings,
    },
    styles: [
      { tag: t.keyword, color: color.violet },
      { tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: color.coral },
      { tag: [t.function(t.variableName), t.labelName], color: color.malibu },
      { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: color.whiskey },
      { tag: [t.definition(t.name), t.separator], color: color.ivory },
      {
        tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
        color: color.chalky,
      },
      {
        tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
        color: color.cyan,
      },
      { tag: [t.meta, t.comment], color: color.stone },
      { tag: t.strong, fontWeight: 'bold' },
      { tag: t.emphasis, fontStyle: 'italic' },
      { tag: t.strikethrough, textDecoration: 'line-through' },
      { tag: t.link, color: color.stone, textDecoration: 'underline' },
      { tag: t.heading, fontWeight: 'bold', color: color.coral },
      { tag: [t.atom, t.bool, t.special(t.variableName)], color: color.whiskey },
      { tag: [t.processingInstruction, t.string, t.inserted], color: color.sage },
      { tag: t.invalid, color: color.invalid },
    ],
  });
};

export const oneDark = oneDarkInit();
