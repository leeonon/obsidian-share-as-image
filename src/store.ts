import type { CodeImageSettings } from '@/types';

import { writable } from 'svelte/store';
import { DEFAULT_SETTINGS } from '@/setting';

function createEditConfig() {
  const { subscribe, set, update } = writable<CodeImageSettings>(DEFAULT_SETTINGS);

  return {
    subscribe,
    set,
    update: (payload: Partial<CodeImageSettings>) => update(state => ({ ...state, ...payload })),
    reset: () => set(DEFAULT_SETTINGS),
  };
}

export const editConfig = createEditConfig();

export default { editConfig };
