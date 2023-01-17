import { Modal, type App } from 'obsidian';

import EditModalContent from './EditModalContent.svelte';

export default class EditModal extends Modal {
	private modalContent: EditModalContent;

	constructor(app: App, lang: string, codeStr: string) {
		super(app);
		this.modalContent = new EditModalContent({
			target: this.contentEl,
			props: {
				lang,
				codeStr,
				onSubmit: () => {
					this.close();
				}
			}
		});

		this.open();
	}

	onOpen(): void {
		super.onOpen();
	}

	onClose(): void {
		super.onClose();
		this.modalContent.$destroy();
	}
}
