import namespaces from '../config/namespaces';
import { isString } from '../helpers/type';

const svgxlink = 'http://www.w3.org/1999/xlink';

function createElm(tag, ns, attrs, doc) {
  const elm = doc.createElementNS(ns, tag);

  for (const i in attrs) {
    if (attrs.hasOwnProperty(i) && isString(attrs[i])) {
      elm.setAttribute(i, attrs[i]);
    }
  }

  return elm;
}

export default class Element {
  constructor(tagName, attributes, children) {
    if (!isString(tagName)) {
      throw new Error('tagName should be a string');
    }

    if (typeof attributes !== 'object') {
      throw new Error('Attributes should be an object');
    }

    this.tagName = tagName.toLowerCase();
    this.attributes = attributes;
    this.children = children;

    if (this.tagName === 'svg') {
      this.attributes.xlink = svgxlink;
    }
  }

  compile(props, doc = document) {
    if (!doc) {
      throw new Error('No "document" object found');
    }

    const namespace = this.tagName === 'svg' ? namespaces.svg : namespaces.html;

    const elm = createElm(this.tagName, namespace, this.attributes, doc);

    let children = this.children;

    if (typeof children === 'function') {
      children = children(props);
    }

    if (Array.isArray(children)) {
      return children.reduce((element, child) => {
        let append;

        if (child instanceof Element) {
          append = child.compile(props);
        }

        if (isString(child)) {
          append = doc.createTextNode(child);
        }

        element.appendChild(append);

        return element;
      }, elm);
    }

    if (isString(children)) {
      elm.appendChild(doc.createTextNode(children));
    }

    return elm;
  }
}
