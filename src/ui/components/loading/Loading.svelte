<script lang="ts">
  import { setIcon } from 'obsidian';
  import { onMount } from 'svelte';

  let loadingEl: HTMLElement;

  onMount(() => {
    setIcon(loadingEl, 'loader');
  });
</script>

<div class="loading">
  <i bind:this="{loadingEl}" class="loading-icon"></i>
  Loading...
</div>

<style>
  @keyframes fadeIn {
    from {
      transform: translateY(-100%) translateX(-50%);
      opacity: 0;
    }
    to {
      transform: translateY(0) translateX(-50%);
      opacity: 1;
    }
  }
  .loading {
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);

    height: 3rem;
    color: #111;
    background: #fff;
    display: flex;
    align-items: center;
    border-radius: 25px;
    padding-left: 1rem;
    padding-right: 2rem;
    width: auto;

    animation: fadeIn 0.15s linear;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .loading-icon {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: spin 3s linear infinite;
    --icon-size: 25px;
  }
</style>
