/** Creates an element and returns it */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  elementName: K,
  properties: Partial<HTMLElementTagNameMap[K]> = {},
  nodes: (string | Node)[] = [],
) {
  const element = document.createElement(elementName);
  Object.assign(element, properties);
  element.append(...nodes);
  return element;
}
