<script lang="ts">
	export let lang: string;
	export let codeStr: string;
	export let onSubmit: (value: any) => void;

	function submit(evt: KeyboardEvent) {
        if (evt.key === "Enter") {
            evt.preventDefault();
            onSubmit(12);
        }
    }
</script>

<div class="number">
	<span>当前的代码语言为:{lang}!</span>
	<code>{codeStr}</code>
</div>

<style>
	.number {
		color: red;
	}
</style>
