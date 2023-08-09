import type { CodeToImagePluginType, CodeImageSettings } from '@/types';

import '@babel/runtime/helpers/extends';
import { Plugin, MarkdownView, type WorkspaceLeaf, type TFile, Notice } from 'obsidian';

import { codeBlockPostProcessor } from '@/postProcessor';
import SettingTab, { DEFAULT_SETTINGS } from '@/setting';
// import MarkdownModal from '@/ui/MarkdownModal';
import MarkdownMakeView from './ui/MarkdownMask/View';

export default class CodeToImagePlugin extends Plugin implements CodeToImagePluginType {
  settings: CodeImageSettings;
  view: MarkdownMakeView;

  async onload() {
    await this.loadSettings();

    this.addTransformCommand();

    this.addSettingTab(new SettingTab(this.app, this));

    /**
     * Init Code Block Post Processor
     */
    this.registerMarkdownPostProcessor((el, ctx) => {
      codeBlockPostProcessor(el, ctx, this.app, this);
    });
  }

  onunload() {}

  /**
   * @memberof CodeToImagePlugin
   */
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  getFrontmatter(file: TFile) {
    const fileCache = this.app.metadataCache.getFileCache(file);
    if (!fileCache) return;

    const { frontmatter } = fileCache;
    return {
      author: frontmatter?.author as string,
      created: frontmatter?.['date created'] || file.stat.ctime,
      modified: frontmatter?.['date modified'] || file.stat.mtime,
      tags: frontmatter?.tags ? (Array.isArray(frontmatter.tags) ? frontmatter.tags : [frontmatter.tags]) : [],
    };
  }

  addTransformCommand() {
    this.addCommand({
      id: 'share-to-image-transform',
      name: 'Share To Image Transform',
      callback: this.getActiveContent.bind(this),
    });
  }

  getActiveContent() {
    const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!activeView || activeView.file.extension !== 'md') {
      new Notice('Active file is not a markdown file');
      return;
    }
    // Get the content of the note and remove the frontmatter information.
    const content = activeView.editor.getValue().replace(/^---[\s\S]*?---\n/, '');
    const title = activeView.file.basename;
    const frontmatter = this.getFrontmatter(activeView.file);
    if (!content) {
      new Notice('Markdown content is empty');
      return;
    }
    this.registerView('markdown-shared-as-image', (leaf: WorkspaceLeaf) => {
      this.view = new MarkdownMakeView(leaf, {
        content,
        title,
        frontmatter,
      });
      return this.view;
    });
    this.app.workspace.getLeaf().setViewState({
      type: 'markdown-shared-as-image',
      active: true,
    });
  }
}
