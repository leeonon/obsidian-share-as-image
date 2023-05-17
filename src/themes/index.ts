/**
 * source: https://github.com/uiwjs/react-codemirror/blob/master/themes
 */
import { darkTheme, color as defaultColor } from '@/themes/default';
import { oneDark, color } from '@codemirror/theme-one-dark';
import { abcdef, defaultSettingsAbcdef } from '@/themes/abcdef';
import { androidstudio, defaultSettingsAndroidstudio } from '@uiw/codemirror-theme-androidstudio';
import { atomone, defaultSettingsAtomone } from '@uiw/codemirror-theme-atomone';
import { dracula, defaultSettingsDracula } from '@uiw/codemirror-theme-dracula';
import { githubDark, defaultSettingsGithubDark } from '@uiw/codemirror-theme-github';
import { nord, defaultSettingsNord } from '@uiw/codemirror-theme-nord';
import { vscodeDark, defaultSettingsVscodeDark } from '@uiw/codemirror-theme-vscode';

export const Theme = [
  { name: 'default', value: darkTheme, color: defaultColor },
  { name: 'oneDark', value: oneDark, color: color },
  { name: 'dracula', value: dracula, color: defaultSettingsDracula },
  { name: 'github', value: githubDark, color: defaultSettingsGithubDark },
  { name: 'nord', value: nord, color: defaultSettingsNord },
  { name: 'vscode', value: vscodeDark, color: defaultSettingsVscodeDark },
  { name: 'abcdef', value: abcdef, color: defaultSettingsAbcdef },
  { name: 'androidstudio', value: androidstudio, color: defaultSettingsAndroidstudio },
  { name: 'atomone', value: atomone, color: defaultSettingsAtomone },
] as const;

export const ThemeOptions = Object.fromEntries(Theme.map(item => [item.name, item.name]));

export type ThemeKey = (typeof Theme)[number]['name'];
