// https://github.com/nyable/obsidian-code-block-enhancer/blob/master/src/core.ts#L6:7
import type { MarkdownPostProcessorContext, App, Plugin } from 'obsidian';

import { LANG_LIST } from '@/constant';

const DEFAULT_LANG_ATTR = 'language-text';
const DEFAULT_LANG = '';
const LANG_REG = /^language-/;
const LINE_SPLIT_MARK = '\n';

export function codeBlockPostProcessor(element: HTMLElement, context: MarkdownPostProcessorContext, app: App, plugin: Plugin) {
	let lang: string = DEFAULT_LANG;
	const code: HTMLPreElement = element.querySelector("pre:not(.frontmatter) > code") as HTMLPreElement;
	if (!code) return null;

	if (!LANG_LIST.some(name => code.classList.contains(`language-${name}`))) {
		return;
	}

	code.classList.forEach((val, key) => {
		if (LANG_REG.test(val)) {
			lang = val.replace(`language-`, '');
			return;
		}
	});

	const pre = code.parentElement;
	console.log('🚀 ~ file: postprocessor.ts:23 ~ code.classList.forEach ~ lang', lang, pre);
	// code.classList.contains(`language-${eLangName}`))

	// @ts-ignore
	const name = app?.account?.name || '';
	console.log('🚀 ~ file: postprocessor.ts:9 ~ codeBlockPostProcessor ~ name', name);
}
