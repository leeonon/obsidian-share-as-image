<script context="module" lang="ts">
  import { ViewPlugin, EditorView } from '@codemirror/view';
  import { StateEffect } from '@codemirror/state';

  import { getExtension, type ExtensionParams } from './extension';
  import { getLanguage, type LanguageType } from './lang';
</script>

<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher, afterUpdate } from 'svelte';
  import { getThemesList, type ThemeKey } from '@/themes';
  import { darkTheme as defaultTheme } from '@/themes/default';

  const dispatch = createEventDispatcher();

  let dom: any;

  let _mounted = false;
  onMount(() => {
    _mounted = true;
    return () => {
      _mounted = false;
    };
  });

  afterUpdate(() => {
    _reconfigureExtensions();
  });

  export let view: any = null;

  /**
   * doc被故意设置为非响应式，以避免在编辑器之外存储冗余的字符串。此外，
   * 将`doc`设置为未定义不会触发更新，因此可以在设置完毕后清除它。
   */
  export let doc: string;

  /* 如果您想通过' update '事件侦听所有事务，请设置此选项. */
  export let verbose = false;

  /* 编程语言 */
  export let lang: LanguageType;
  /* 需要开启的插件 */
  export let extensions: ExtensionParams | undefined = undefined;

  export let theme: ThemeKey = 'default';

  export let fontSize: string = '14px';

  /* 缓存文档字符串，不用一次又一次地批量提取字符串. */
  let _docCached: any = null;

  function getTheme() {
    const themes = getThemesList({
      settings: { fontFamily: 'Comic Mono' },
    });
    const themeExtension = themes.find(v => v.name === theme)?.value || defaultTheme;
    // TODO The font size is customized
    const fontSizeExtension = EditorView.theme({
      '&': {
        fontSize,
      },
    });
    return [themeExtension, fontSizeExtension];
  }

  $: stateExtensions = [...getExtension(extensions), getTheme(), getLanguage(lang)].filter(Boolean);

  /* Overwrite the bulk of the text with the one specified. */
  function _setText(text: string) {
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: text },
    });
  }

  const subscribers = new Set();

  /* And here comes the reactivity, implemented as a r/w store. */
  export const docStore = {
    ready: () => view !== null,
    subscribe(cb: any) {
      subscribers.add(cb);

      if (!this.ready()) {
        cb(null);
      } else {
        if (_docCached == null) {
          _docCached = view.state.doc.toString();
        }
        cb(_docCached);
      }

      return () => void subscribers.delete(cb);
    },
    set(newValue: string) {
      if (!_mounted) {
        throw new Error('Cannot set docStore when the component is not mounted.');
      }

      const inited = _initEditorView(newValue);
      if (!inited) _setText(newValue);
    },
  };

  function _reconfigureExtensions() {
    if (view === null) return;
    view.dispatch({
      effects: StateEffect.reconfigure.of(stateExtensions),
    });
  }

  $: _reconfigureExtensions();

  function _editorTxHandler(tr: any) {
    this.update([tr]);

    if (verbose) {
      dispatch('update', tr);
    }

    if (tr.docChanged) {
      _docCached = null;
      if (subscribers.size) {
        dispatchDocStore((_docCached = tr.newDoc.toString()));
      }
      dispatch('change', { view: this, tr });
    }
  }

  function dispatchDocStore(s: any) {
    for (const cb of subscribers) {
      // @ts-ignore
      cb(s);
    }
  }

  // the view will be inited with the either doc (as long as that it is not `undefined`)
  // or the value in docStore once set
  function _initEditorView(initialDoc: string) {
    if (view !== null) {
      return false;
    }

    // CodeMirror 5
    // view = window.CodeMirror(dom, {
    //   value: initialDoc,
    //   mode: { name: 'javascript', json: true },
    //   lineNumbers: true,
    //   lineWrapping: true,
    //   cursorHeight: 0.85,
    //   indentUnit: 2,
    //   dragDrop: true,
    //   autocapitalize: true,
    //   theme: 'default',
    //   gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    // });

    // CodeMirror 6
    view = new EditorView({
      doc: initialDoc,
      extensions: stateExtensions,
      parent: dom,
      dispatch: _editorTxHandler,
    });

    return true;
  }

  $: if (_mounted && doc !== undefined) {
    const inited = _initEditorView(doc);
    dispatchDocStore(doc);
  }

  onDestroy(() => {
    if (view !== null) {
      view.destroy();
    }
  });
</script>

<div class="codemirror" bind:this="{dom}"></div>

<style>
  .codemirror {
    padding: 1rem;
  }
</style>
