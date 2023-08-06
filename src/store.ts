import type { CodeImageSettings, MarkdownMaskImageSettings } from '@/types';

import { writable } from 'svelte/store';
import { DEFAULT_SETTINGS, MARKDOWN_MAKE_IMAGE_SETTINGS } from '@/setting';

function createEditConfig() {
  const { subscribe, set, update } = writable<CodeImageSettings>(DEFAULT_SETTINGS);

  return {
    subscribe,
    set,
    update: (payload: Partial<CodeImageSettings>) => update(state => ({ ...state, ...payload })),
    reset: () => set(DEFAULT_SETTINGS),
  };
}

function createMarkdownMakeConfig() {
  const { subscribe, set, update } = writable<MarkdownMaskImageSettings>(MARKDOWN_MAKE_IMAGE_SETTINGS);

  return {
    subscribe,
    set,
    update: (payload: Partial<MarkdownMaskImageSettings>) => update(state => ({ ...state, ...payload })),
    reset: () => set(MARKDOWN_MAKE_IMAGE_SETTINGS),
  };
}

export const editConfig = createEditConfig();
export const markdownMakeImageConfig = createMarkdownMakeConfig();

export default { editConfig, markdownMakeImageConfig };
