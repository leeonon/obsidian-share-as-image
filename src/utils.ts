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

export function isSlateElement(element: HTMLElement) {
  return element.nodeName === 'SPAN' && element.dataset.slate === 'true';
}

/**
 * determine whether a style attribute exists on the element object.
 */
export function hasStyle(element: HTMLElement, styleName: keyof CSSStyleDeclaration) {
  return !!element.style[styleName];
}

/**
 * Container used to select certain elements on a page and set their styles.
 * @returns HTMLSpanElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createSpanRange(selection: Selection, property: any, value: string) {
  const range = selection.getRangeAt(0);
  const fragment = range.cloneContents();

  const spanEl = document.createElement('span');
  spanEl.append(fragment);
  const elements = spanEl.querySelectorAll('*');

  elements.forEach(element => {
    if (element instanceof HTMLElement) {
      if (!isSlateElement(element)) {
        return;
      }

      if (hasStyle(element, property)) {
        element.style.removeProperty(property);
      }

      // If the element does not have a style set, remove the tag directly
      if (element.style.length === 0) {
        element.outerHTML = element.innerHTML;
      }
    }
    console.log('🚀 ~ file: utils.ts:47 ~ createSpanRange ~ element:', element);
  });

  spanEl.dataset.slate = 'true';
  spanEl.style[property] = value;
  spanEl.appendChild(fragment);

  return spanEl;
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
