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
export function createSpanRange<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  selection: Selection,
  style?: Record<any, any>
) {
  const range = selection.getRangeAt(0);
  const fragment = range.cloneContents();
  const elements = fragment.querySelectorAll('*');
  const styles = Object.entries(style || {}).map(([key, value]) => [key, value]);

  const tagEl = document.createElement(tag);
  tagEl.append(fragment);

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

  tagEl.normalize();

  tagEl.dataset.slate = 'true';
  styles.forEach(([property, value]) => {
    tagEl.style.setProperty(property, value);
  });
  tagEl.appendChild(fragment);

  return tagEl;
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

export type LocalFontType = {
  family: string;
  fullName: string;
  postscriptName: string;
  style: string;
};
/**
 * Retrieves the list of local fonts available on the user's system.
 *
 * @return {Promise<string[]>} An array of font family names.
 */
export async function getLocalFont(): Promise<string[]> {
  try {
    // @ts-ignore
    const allFont = (await window.queryLocalFonts()) as LocalFontType[];
    const family = [...new Set(allFont.map(item => item.family))];
    return family;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function convertToRGBA(color: string, opacity: number) {
  const rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  const rgbaMatch = color.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/);

  if (rgbMatch) {
    return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${opacity})`;
  } else if (rgbaMatch) {
    return `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${opacity})`;
  } else {
    return color;
  }
}
