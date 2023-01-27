import type { LanguageType } from '@/ui/Codemirror/lang';

import { Modal, type App } from 'obsidian';
import EditModalContent from './EditModalContent.svelte';

export default class EditModal extends Modal {
	private modalContent: EditModalContent;
	private lang: LanguageType;
	private code: string;

	constructor(app: App, lang: LanguageType, code: string) {
		super(app);

		this.lang = lang;
		this.code = code;
		this.initModal();
	}

	private initModal() {
		this.modalEl.addClass('code-to-image-modal');
		this.titleEl.innerText = 'CodeToImage';

		this.modalContent = new EditModalContent({
			target: this.contentEl,
			props: {
				lang: this.lang,
				value: this.code,
			}
		});

		this.open();
	}

	public onOpen(): void {
		super.onOpen();
	}

	public onClose(): void {
		super.onClose();
		this.modalContent.$destroy();
	}
}
