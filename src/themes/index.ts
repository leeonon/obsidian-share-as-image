import { darkTheme } from '@/themes/default';
import { oneDark } from '@/themes/oneDarkTheme';

export const Theme = [
  { name: 'default', value: darkTheme },
  { name: 'oneDark', value: oneDark },
] as const;

export const ThemeOptions = Object.fromEntries(Theme.map(item => [item.name, item.name]));

export type ThemeKey = (typeof Theme)[number]['name'];
