<script lang="ts">
	import type { LanguageType } from '@/ui/Codemirror/lang';
	import CodeMirror from "@/ui/Codemirror/index.svelte";
	import TitleBar from '@/ui/TitleBar.svelte';
	import EditBar from '@/ui/EditBar.svelte';

	let store: any;
	export let value: string;
	export let lang: LanguageType;

	function changeHandler({ detail: { tr } }: any) {
		console.log("change", tr.changes.toJSON());
	}
</script>

	<TitleBar />
	<div class="ctj-edit_background">
		<EditBar />
		<CodeMirror
			lang={lang}
			doc={value}
			bind:docStore={store}
			on:change={changeHandler}
		/>
	</div>

<style lang="scss">
	:global(.codemirror) {
		border: 1px solid #ddd;
	}
	.ctj-edit {
		&_background {
			padding: 36px;
			border-radius: .75rem;
			background-image: linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%);
			background-color: rgb(65, 88, 208);
		}
	}
</style>
