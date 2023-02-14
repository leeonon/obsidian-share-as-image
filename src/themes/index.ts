import { darkTheme, color as defaultColor } from '@/themes/default';
import { oneDark, color as oneDarkColor } from '@/themes/oneDarkTheme';

export const Theme = [
  { name: 'default', value: darkTheme, color: defaultColor },
  { name: 'oneDark', value: oneDark, color: oneDarkColor },
] as const;

export const ThemeOptions = Object.fromEntries(Theme.map(item => [item.name, item.name]));

export type ThemeKey = (typeof Theme)[number]['name'];
