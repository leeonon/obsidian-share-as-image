<script lang="ts">
	const options = [
		{ value: 'OneDrakTheme', name: 'OneDrakTheme' },
		{ value: 'OneDrak2', name: 'OneDrak2' },
		{ value: 'OneDrak3', name: 'OneDrak3' },
		{ value: 'OneDrak4', name: 'OneDrak4' },
	];
</script>

<div class='cti-title-bar'>
	<div class:active={true} class="cti-title-bar_item">
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
	<div class="cti-title-bar_item">
		<span>Background：</span>
		<div class="checkbox-container is-enabled"><input type="checkbox" tabindex="0"></div>
	</div>
	<div class="cti-title-bar_item">
		<span>DarkMode：</span>
		<div class="checkbox-container is-enabled"><input type="checkbox" tabindex="0"></div>
	</div>
</div>


<style lang="scss">
	.cti-title-bar {
		display: flex;
		align-items: center;
		border: 1px solid hsla(0,0%,100%,.2);
		border-radius: 10px;
		padding: 20px;
		margin-bottom: 35px;

		&_item {
			display: flex;
			align-items: center;
			margin-right: 20px;
		}
	}
</style>
