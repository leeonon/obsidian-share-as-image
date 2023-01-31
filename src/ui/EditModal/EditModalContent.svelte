<script lang="ts">
import type { LanguageType } from '@/ui/Codemirror/lang';

import { onDestroy } from 'svelte';
import CodeMirror from '@/ui/Codemirror/index.svelte';
import TitleBar from '@/ui/TitleBar.svelte';
import WindowBar from '@/ui/WindowBar.svelte';
import store, { type EditConfigType } from '@/store';

let editConfig: EditConfigType;
let docStore: any;
export let value: string;
export let lang: LanguageType;

function changeHandler({ detail: { tr } }: any) {
  console.log('change', tr.changes.toJSON());
}

const unsubscribe = store.editConfig.subscribe(config => (editConfig = config));

/**
 * Unsubscribe when destroyed
 */
onDestroy(unsubscribe);
</script>

<TitleBar />
<div class="ctj-edit_background">
  <div class="ctj-edit_content">
    <WindowBar />
    <CodeMirror lang="{lang}" doc="{value}" bind:docStore="{docStore}" on:change="{changeHandler}" />
  </div>
</div>

<style lang="scss">
:global(.codemirror) {
  border: 1px solid #ddd;
}
.ctj-edit {
  &_background {
    width: fit-content;
    margin: auto;
    padding: 36px;
    border-radius: 0.75rem;
    background-image: linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%);
    background-color: rgb(65, 88, 208);
    overflow: auto;
    resize: both;
  }

  &_content {
    border-radius: 0.75rem;
    background-color: rgba(31, 41, 55, 0.8);
    /* background-color: rgb(31 41 55/1); */
  }
}
</style>
