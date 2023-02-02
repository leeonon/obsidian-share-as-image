import type CodeToImagePlugin from './main';

import { writable } from 'svelte/store';

export interface EditConfigType {
  theme?: string;
  hasBackground?: boolean;
  isDarkMode?: boolean;
  windowControls?: boolean;
  barTitle?: string;
  showLineNumber?: boolean;
  hasWatermark?: boolean;
}

/**
 * This Plugin
 */
export const plugin = writable<CodeToImagePlugin>();

const defaultConfig: EditConfigType = {
  theme: 'OneDark3',
  hasBackground: true,
  isDarkMode: true,
  windowControls: true,
  barTitle: '',
  showLineNumber: false,
  hasWatermark: false,
};

function createEditConfig() {
  const { subscribe, set, update } = writable<EditConfigType>(defaultConfig);

  return {
    subscribe,
    set,
    update: (payload: EditConfigType) => update(state => ({ ...state, ...payload })),
    reset: () => set(defaultConfig),
  };
}

export const editConfig = createEditConfig();

export default { plugin, editConfig };
