export function createElement(elementType: keyof HTMLElementTagNameMap, className?: string) {
  const element = document.createElement(elementType);
  if (className) {
    element.className = className;
  }
  return element;
}

export function getLocalLanguage() {
  const language = window.localStorage.getItem('language');
  if (language === 'zh' || language === 'zh-TW') {
    return 'zh';
  }
  return 'en';
}

export function downloadFileToFolder(fileType: string) {}

/**
 * Container used to select certain elements on a page and set their styles.
 * @returns HTMLSpanElement
 */
export function createSpanRange(selection: Selection, property: string, value: string) {
  const range = selection.getRangeAt(0);
  const fragment = range.cloneContents();
  const elements = fragment.querySelectorAll('*');
  console.log('🚀 ~ file: utils.ts:27 ~ createSpanRange ~ elements:', elements);
  const element = document.createElement('span');
  element.dataset.slate = 'true';
  return element;
}

/**
 * determine whether a style attribute exists on the element object.
 */
export function hasStyle(element: HTMLElement, styleName: keyof CSSStyleDeclaration) {
  return !!element.style[styleName];
}

/**
 * set the font size of the element object.
 */
export function setSpanRangeStrong(element: HTMLSpanElement, value?: string) {
  if (hasStyle(element, 'fontWeight')) {
    element.style.removeProperty('font-weight');
    return;
  }
  element.style.fontWeight = value ?? 'bold';
}

export function setSpanRangeColor(element: HTMLSpanElement, value: string) {
  if (hasStyle(element, 'color')) {
    element.style.removeProperty('color');
    return;
  }
  element.style.color = value;
}
