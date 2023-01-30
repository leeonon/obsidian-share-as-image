// https://github.com/nyable/obsidian-code-block-enhancer/blob/master/src/core.ts#L6:7
import type { MarkdownPostProcessorContext, App, Plugin } from 'obsidian';
import type { LanguageType } from '@/ui/Codemirror/lang';

import { LANG_LIST } from '@/constant';
import { createElement } from '@/utils';
import EditModal from '@/views/EditModal/EditModal';



const LANG_REG = /^language-/;
// const LINE_SPLIT_MARK = '\n';

export function codeBlockPostProcessor(element: HTMLElement, context: MarkdownPostProcessorContext, app: App, plugin: Plugin) {
	console.log('🚀 ~ file: postprocessor.ts:15 ~ codeBlockPostProcessor ~ context', context);
	let lang: LanguageType = 'text';
	const code: HTMLPreElement = element.querySelector("pre:not(.frontmatter) > code") as HTMLPreElement;

	if (!code) return;

	if (!LANG_LIST.some(name => code.classList.contains(`language-${name}`))) {
		return;
	}

	code.classList.forEach((val, key) => {
		if (LANG_REG.test(val)) {
			lang = val.replace(`language-`, '') as LanguageType;
			return;
		}
	});

	const pre = code.parentElement;

	if (pre?.parentElement?.querySelector(`div.code-to-image-wrap`)) {
		return;
	}

	pre?.parentElement?.addClass(`code-to-image-wrap`);

	// const contentList: string[] = code.textContent?.split(LINE_SPLIT_MARK) || [];

	const button = createElement('button', 'code-to-image_button');
	button.setAttribute('aria-label', 'Share To Image');
	button.innerText = 'Share';

	const buttonHanlder = () => {
		new EditModal(app, lang, code.innerText);
	};

	plugin.registerDomEvent(button, 'click', buttonHanlder);
	pre?.parentElement?.appendChild(button);

	// @ts-ignore
	const name = app?.account?.name || '';
	console.log('🚀 ~ file: postprocessor.ts:9 ~ codeBlockPostProcessor ~ name', name);
}
