export function createElement(elementType: keyof HTMLElementTagNameMap, className?: string) {
  const element = document.createElement(elementType);
  if (className) {
    element.className = className;
  }
  return element;
}
