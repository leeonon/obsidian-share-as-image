import type CodeToImagePlugin from './main';

import { writable } from 'svelte/store';

export interface EditConfigType {
  theme?: string;
  hasBackground?: boolean;
  isDarkMode?: boolean;
}

/**
 * This Plugin
 */
export const plugin = writable<CodeToImagePlugin>();

/**
 * Edit Config
 */
export const editConfig = writable<EditConfigType>({
  theme: 'OneDrak3',
  hasBackground: true,
  isDarkMode: true,
});

export default { plugin, editConfig };
