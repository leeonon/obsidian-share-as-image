// https://github.com/nyable/obsidian-code-block-enhancer/blob/master/src/core.ts#L6:7
import type { MarkdownPostProcessorContext, App } from 'obsidian';
import type { LanguageType } from '@/ui/code/Codemirror/lang';
import type { CodeToImagePluginType } from '@/types';
import { editConfig } from '@/store';
import { langs } from '@/ui/code/Codemirror/lang';
import { DEFAULT_SETTINGS } from '@/setting';

import { createElement, getLocalLanguage } from '@/utils';
import EditModal from '@/ui/code/EditModal';

export function codeBlockPostProcessor(
  element: HTMLElement,
  context: MarkdownPostProcessorContext,
  app: App,
  plugin: CodeToImagePluginType
) {
  let lang: LanguageType = 'TEXT';
  const code: HTMLPreElement = element.querySelector('pre:not(.frontmatter) > code') as HTMLPreElement;

  if (!code) return;

  code.classList.forEach((val, key) => {
    if (/^language-/.test(val)) {
      lang = val.replace(`language-`, '').toUpperCase() as LanguageType;
      return;
    }
  });

  const pre = code.parentElement;

  if (pre?.parentElement?.querySelector(`div.code-to-image-wrap`)) {
    return;
  }

  pre?.parentElement?.addClass(`code-to-image-wrap`);

  const button = createElement('button', 'code-to-image-button');
  button.innerText = getLocalLanguage() === 'zh' ? '图片' : 'Image';

  const buttonHandler = async () => {
    const localData = await plugin.loadData();
    const codeSettings = Object.assign({}, DEFAULT_SETTINGS, localData?.codeSettings);
    const language = (Object.keys(langs).find(key => key === lang) || 'TEXT') as LanguageType;
    editConfig.set({
      ...codeSettings,
      language,
    });
    new EditModal(app, plugin, language, code.innerText);
  };

  plugin.registerDomEvent(button, 'click', buttonHandler);
  pre?.appendChild(button);
}
