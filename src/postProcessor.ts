// https://github.com/nyable/obsidian-code-block-enhancer/blob/master/src/core.ts#L6:7
import type { MarkdownPostProcessorContext, App } from 'obsidian';
import type { LanguageType } from '@/ui/Codemirror/lang';
import type { CodeToImagePluginType } from '@/types';

import { createElement } from '@/utils';
import EditModal from '@/ui/EditModal';

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

  const button = createElement('button', 'code-to-image_button');
  button.setAttribute('aria-label', 'Share To Image');
  button.innerText = 'Share';

  const buttonHanlder = () => {
    new EditModal(app, plugin, lang, code.innerText);
  };

  plugin.registerDomEvent(button, 'click', buttonHanlder);
  pre?.parentElement?.appendChild(button);
}
