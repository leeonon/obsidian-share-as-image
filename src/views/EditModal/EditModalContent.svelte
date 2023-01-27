<script lang="ts">
	import type { LanguageType } from '@/ui/Codemirror/lang';
	import CodeMirror from "@/ui/Codemirror/index.svelte";
	import TitleBar from '@/ui/TitleBar.svelte';

	let store: any;
	export let value: string;
	export let lang: LanguageType;

	function changeHandler({ detail: { tr } }: any) {
		console.log("change", tr.changes.toJSON());
	}
</script>

<div>
	<TitleBar />
	<CodeMirror
		lang={lang}
		doc={value}
		bind:docStore={store}
		on:change={changeHandler}
	/>
</div>

<style>
	:global(.codemirror) {
		border: 1px solid #ddd;
	}
</style>
