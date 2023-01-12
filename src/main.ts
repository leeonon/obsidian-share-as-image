import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

import InsertLinkModal from './views/InsertLinkModal';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
};

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();
		// 这将在左侧ribbon中创建一个图标。
		const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('Hello Hello Hello!');
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// 这将在应用程序的底部添加一个状态栏项。不适用于移动应用程序。
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('状态栏文本信息');

		// 这添加了一个可以在任何地方触发的简单命令
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: '打开模态弹窗(简单)',
			callback: () => {
				new InsertLinkModal(this.app, '默认文本', () => alert('回调')).open();
			}
		});
		// 这将添加一个编辑器命令，可以对当前编辑器实例执行某些操作
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		// 这增加了一个复杂的命令，可以检查应用程序的当前状态是否允许执行该命令
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				console.log('🚀 ~ file: main.ts:54 ~ MyPlugin ~ onload ~ markdownView', markdownView);
				if (markdownView) {
					// 如果检查为真，我们只是在“检查”命令是否可以运行。
					// 如果checking为false，那么我们要实际执行操作。
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// 当check函数返回true时，此命令才会显示在命令面板中
					return true;
				}
			}
		});

		// 这将添加一个设置选项卡，以便用户可以配置插件的各个方面
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// 如果插件连接了任何全局DOM事件(应用程序中不属于这个插件的部分)
		// 当这个插件被禁用时，使用这个函数将自动移除事件监听器。
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// 当注册间隔时，当插件被禁用时，这个函数将自动清除间隔。
		// this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
		// this.registerInterval(
		// 	window.setInterval(this.injectButtons, 1000)
		// );
		// this.injectButtons();

		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		console.log('🚀 ~ file: main.ts:87 ~ MyPlugin ~ onload ~ view', view);


		// this.registerMarkdownCodeBlockProcessor()
		this.registerMarkdownPostProcessor((el) => {
			console.log('🚀 ~ registerMarkdownPostProcessor 获取当前元素块', el);
		});
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	injectButtons = () => {
		console.log('DOM:', document.querySelectorAll('pre > code'));
		this.addButton();
	};

	addButton = () => {
		document.querySelectorAll('pre > code').forEach((codeBlock) => {
			const pre = codeBlock.parentNode;
			console.log('🚀 ~ file: main.ts:98 ~ MyPlugin ~ document.querySelectorAll ~ pre', pre);

			// for (let lang of excludeLangs) {
			// 	if (pre?.classList)
			// }
		});
	};
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
