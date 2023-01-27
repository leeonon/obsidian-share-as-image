<script lang="ts">
	const options = [
		{ value: 'OneDrakTheme', name: 'OneDrakTheme' },
		{ value: 'OneDrak2', name: 'OneDrak2' },
		{ value: 'OneDrak3', name: 'OneDrak3' },
		{ value: 'OneDrak4', name: 'OneDrak4' },
	];

	const langOptions = [
		{ value: 'javascript', name: 'JavaScript' },
		{ value: 'rust', name: 'Rust' },
		{ value: 'java', name: 'Java' },
		{ value: 'python', name: 'Python' },
	];
</script>

<div class='code-to-image-title-bar'>
	<div>
		<span>Theme：</span>
		<select
			class="dropdown"
			name="Version"
		>
			{#each options as item (item.value)}
				<option value={item.value}>{item.name}</option>
			{/each}
		</select>
	</div>
	<div>
		<span class="code-to-iamge-language-select">language：</span>
		<select
			class="dropdown"
			name="Version"
		>
			{#each langOptions as item (item.value)}
				<option value={item.value}>{item.name}</option>
			{/each}
		</select>
	</div>
</div>


<style>
	.code-to-image-title-bar {
		border: 1px solid hsla(0,0%,100%,.2);
		border-radius: 10px;
		padding: 20px;
		margin-bottom: 35px;
	}
	.code-to-iamge-language-select {
		margin-left: 20px;
	}
</style>
