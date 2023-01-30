import type CodeToImagePlugin from './main';

import { writable } from 'svelte/store';

export interface EditConfig {
  theme: string;
  hasBackground: boolean;
  isDarkMode: boolean;
}

const editConfig = writable<CodeToImagePlugin>();

export default { editConfig };
