import LoadingComponent from './Loading.svelte';

export default class Loading {
  private instance: LoadingComponent | null = null;

  show(target?: HTMLElement) {
    this.instance = new LoadingComponent({
      target: target || document.body,
    });
  }

  hide() {
    if (this.instance) {
      this.instance.$destroy();
      this.instance = null;
    }
  }
}
