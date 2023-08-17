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
export function createSpanRange(selection: Selection, style: Record<any, any>) {
  const range = selection.getRangeAt(0);
  const fragment = range.cloneContents();
  const elements = fragment.querySelectorAll('*');
  const styles = Object.entries(style).map(([key, value]) => [key, value]);

  const spanEl = document.createElement('span');
  spanEl.append(fragment);

  elements.forEach(element => {
    if (element instanceof HTMLElement) {
      if (!isSlateElement(element)) {
        return;
      }

      styles.forEach(([property, value]) => {
        if (hasStyle(element, property)) {
          element.style.removeProperty(property as string);
        }
      });

      /**
       * If the element does not have a style set, remove the tag directly
       */
      if (element.style.length === 0) {
        const parent = element.parentNode;
        while (element.firstChild) {
          parent?.insertBefore(element.firstChild, element);
        }

        parent?.removeChild(element);
      }
    }
  });

  spanEl.normalize();

  spanEl.dataset.slate = 'true';
  styles.forEach(([property, value]) => {
    spanEl.style.setProperty(property, value);
  });
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
