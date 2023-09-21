import type { CodeToImagePluginType, CodeImageSettings, PageImageSettings, PageViewType } from '@/types';

import '@babel/runtime/helpers/extends';
import { Plugin, MarkdownView, type TFile, Notice } from 'obsidian';

import { codeBlockPostProcessor } from '@/postProcessor';
import SettingTab, { DEFAULT_SETTINGS, MARKDOWN_MAKE_IMAGE_SETTINGS } from '@/setting';
import { markdownMakeImageConfig } from '@/store';
import MakePageView, { MARKDOWN_MAKE_IMAGE_VIEW } from './ui/page/View';

export default class CodeToImagePlugin extends Plugin implements CodeToImagePluginType {
  settings: {
    codeSettings: CodeImageSettings;
    pageSettings: PageImageSettings;
  };
  customParams: PageViewType;

  async onload() {
    await this.loadSettings();

    this.registerView(MARKDOWN_MAKE_IMAGE_VIEW, leaf => new MakePageView(leaf, this));

    this.addRibbonIcon('dice', 'Activate view', () => {
      this.getActiveContent();
    });

    this.addTransformCommand();

    this.addSettingTab(new SettingTab(this.app, this));

    /**
     * Init Code Block Post Processor
     */
    this.registerMarkdownPostProcessor((el, ctx) => {
      codeBlockPostProcessor(el, ctx, this.app, this);
    });
  }

  onunload() {
    this.app.workspace.detachLeavesOfType(MARKDOWN_MAKE_IMAGE_VIEW);
  }

  activateView = async () => {
    this.app.workspace.detachLeavesOfType(MARKDOWN_MAKE_IMAGE_VIEW);

    const leaf = await this.app.workspace.getLeaf(false);
    leaf.setViewState({
      type: MARKDOWN_MAKE_IMAGE_VIEW,
      active: true,
    });
    leaf.setPinned(true);

    const leafAll = this.app.workspace.getLeavesOfType(MARKDOWN_MAKE_IMAGE_VIEW);
    if (leafAll.length) {
      this.app.workspace.revealLeaf(leafAll[0]);
    }
  };

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
      callback: this.getActiveContent,
    });
  }

  getActiveContent = () => {
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

    this.customParams = {
      content,
      title,
      sourcePath: activeView.file?.path || '/',
      frontmatter,
    };
    // 设置默认值
    markdownMakeImageConfig.set(this.settings.pageSettings);

    this.activateView();
  };
}
