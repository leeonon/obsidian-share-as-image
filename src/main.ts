import type { CodeToImagePluginType, CodeImageSettings, PageImageSettings } from '@/types';

import '@babel/runtime/helpers/extends';
import { Plugin, MarkdownView, type WorkspaceLeaf, type TFile, Notice } from 'obsidian';

import { codeBlockPostProcessor } from '@/postProcessor';
import SettingTab, { DEFAULT_SETTINGS, MARKDOWN_MAKE_IMAGE_SETTINGS } from '@/setting';
import { markdownMakeImageConfig } from '@/store';
import MakePageView from './ui/page/View';

export default class CodeToImagePlugin extends Plugin implements CodeToImagePluginType {
  settings: {
    codeSettings: CodeImageSettings;
    pageSettings: PageImageSettings;
  };
  view: MakePageView;

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
    const localData = await this.loadData();
    this.settings = {
      codeSettings: Object.assign({}, DEFAULT_SETTINGS, localData?.codeSettings),
      pageSettings: Object.assign({}, MARKDOWN_MAKE_IMAGE_SETTINGS, localData?.pageSettings),
    };
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
    if (!activeView || activeView.file?.extension !== 'md') {
      new Notice('Active file is not a markdown file');
      return;
    }
    // Get the content of the note and remove the frontmatter information.
    const content = activeView.editor.getValue().replace(/^---[\s\S]*?---\n/, '');
    const title = activeView.file?.basename;
    const frontmatter = this.getFrontmatter(activeView.file);
    if (!content) {
      new Notice('Markdown content is empty');
      return;
    }
    this.registerView('markdown-shared-as-image', (leaf: WorkspaceLeaf) => {
      this.view = new MakePageView(leaf, this, {
        content,
        title,
        sourcePath: activeView.file?.path || '/',
        frontmatter,
      });
      return this.view;
    });

    // 设置默认值
    markdownMakeImageConfig.set(this.settings.pageSettings);

    this.app.workspace.getLeaf().setViewState({
      type: 'markdown-shared-as-image',
      active: true,
    });
  }
}
