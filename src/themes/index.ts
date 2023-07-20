/**
 * source: https://github.com/uiwjs/react-codemirror/blob/master/themes
 */
import type { CreateThemeOptions } from '@uiw/codemirror-themes';

import { defaultSettingsAndroidstudio, androidstudioInit } from '@uiw/codemirror-theme-androidstudio';
import { atomoneInit, defaultSettingsAtomone } from '@uiw/codemirror-theme-atomone';
import { draculaInit, defaultSettingsDracula } from '@uiw/codemirror-theme-dracula';
import { githubDarkInit, defaultSettingsGithubDark } from '@uiw/codemirror-theme-github';
import { nordInit, defaultSettingsNord } from '@uiw/codemirror-theme-nord';
import { vscodeDarkInit, defaultSettingsVscodeDark } from '@uiw/codemirror-theme-vscode';

import { darkThemeInit, color as defaultColor } from '@/themes/default';
import { oneDarkInit, color } from '@/themes/oneDark';

export const getThemesList = (options?: Partial<CreateThemeOptions>) => {
  return [
    { name: 'default', value: darkThemeInit(options), color: defaultColor },
    { name: 'oneDark', value: oneDarkInit(options), color },
    { name: 'dracula', value: draculaInit(options), color: defaultSettingsDracula },
    { name: 'github', value: githubDarkInit(options), color: defaultSettingsGithubDark },
    { name: 'nord', value: nordInit(options), color: defaultSettingsNord },
    { name: 'vscode', value: vscodeDarkInit(options), color: defaultSettingsVscodeDark },
    { name: 'androidstudio', value: androidstudioInit(options), color: defaultSettingsAndroidstudio },
    { name: 'atomone', value: atomoneInit(options), color: defaultSettingsAtomone },
  ];
};

export const themeList = getThemesList();

export const ThemeOptions = Object.fromEntries(themeList.map(item => [item.name, item.name]));
export type ThemeKey = (typeof themeList)[number]['name'];
