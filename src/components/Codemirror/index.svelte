<script context="module" lang="ts">
	import { ViewPlugin, EditorView } from "@codemirror/view";
	import { StateEffect } from "@codemirror/state";

	import { getExtension, type ExtensionParams } from './extension';
	import { getLanguage, type LanguageType } from './lang';
</script>

<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from "svelte";
	import { oneDark } from '@/themes/oneDarkTheme';
	const dispatch = createEventDispatcher();

	let dom: any;

	let _mounted = false;
	onMount(() => {
		_mounted = true;
		return () => {
			_mounted = false;
		};
	});

	export let view: any = null;

	/* `doc` is deliberately made non-reactive for not storing a reduntant string
	   besides the editor. Also, setting doc to undefined will not trigger an
	   update, so that you can clear it after setting one. */
	export let doc: string;

	/* Set this if you would like to listen to all transactions via `update` event. */
	export let verbose = false;

	/* 编程语言 */
	export let lang: LanguageType = 'text';
	/* 需要开启的插件 */
	export let extensions: ExtensionParams | undefined = undefined;

	/* Cached doc string so that we don't extract strings in bulk over and over. */
	let _docCached: any = null;

	$: stateExtensions = [
		...getExtension(extensions),
		...getTheme(),
		getLanguage(lang)
	]

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
				throw new Error(
					"Cannot set docStore when the component is not mounted."
				);
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

	function getTheme() {
		return [oneDark];
	}

	$: _reconfigureExtensions();

	function _editorTxHandler(tr: any) {
		this.update([tr]);

		if (verbose) {
			dispatch("update", tr);
		}

		if (tr.docChanged) {
			_docCached = null;
			if (subscribers.size) {
				dispatchDocStore((_docCached = tr.newDoc.toString()));
			}
			dispatch("change", { view: this, tr });
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

<div class="codemirror" bind:this={dom} />

<style>
	.codemirror {
		display: contents;
	}
</style>
