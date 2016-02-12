import namespaces from '../config/namespaces';

const svgxlink = 'http://www.w3.org/1999/xlink';

function isString(str) {
  return typeof str === 'string' || str instanceof String;
}

function createElm(tag, ns, attrs, doc) {
  let elm = doc.createElementNS(ns, tag);

  for (let i in attrs) {
    let val = attrs[i];
    if (attrs.hasOwnProperty(i) && isString(val)) {
      elm.setAttribute(i, val);
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
      return children.forEach(function loopChildren(child) {
        if (child instanceof Element) {
          return child.compile(props);
        }

        if (typeof child === 'string' || child instanceof String) {

        }
      });
    }

    return elm;
  }
}