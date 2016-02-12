export function el(tagName = 'div', selector = false, children = '') {
  return [
    tagName,
    selector ? { class: 'test' } : {},
    children,
  ];
}

function dom(children) {}

export default dom;