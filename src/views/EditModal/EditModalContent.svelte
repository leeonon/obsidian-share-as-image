<script lang="ts">
	import CodeMirror from "@/components/Codemirror.svelte";
	import { rust } from '@codemirror/lang-rust';

	let store: any;
	export let value: string;

	function changeHandler({ detail: { tr } }: any) {
		console.log("change", tr.changes.toJSON());
	}
</script>

<CodeMirror
	lang={rust()}
	doc={value}
	bind:docStore={store}
	on:change={changeHandler}
/>

<style>
	:global(.codemirror) {
		border: 1px solid #ddd;
	}
</style>
