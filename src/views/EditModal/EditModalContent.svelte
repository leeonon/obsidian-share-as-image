<script lang="ts">
	import CodeMirror from "@/components/Codemirror/index.svelte";
	import { rust } from '@codemirror/lang-rust';

	let store: any;
	export let value: string;

	function changeHandler({ detail: { tr } }: any) {
		console.log("change", tr.changes.toJSON());
	}
</script>

<div>
	<CodeMirror
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
