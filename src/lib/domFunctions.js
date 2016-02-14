import Element from './Element';
import { idClassParser } from '../helpers/idClassParser';
import { isString, isArray, isFunction } from '../helpers/type';

export function el(tagName = 'div', attr = {}, children = '') {
  if (isArray(tagName) || isFunction(tagName)) {
    children = tagName;
    tagName = 'div';
    attr = {};
  }

  if (isArray(attr) || isFunction(attr)) {
    children = attr;
    attr = {};
  }

  let attributes = attr;

  if (isString(attr)) {
    attributes = idClassParser(attr);
  }

  return new Element(tagName, attributes, children);
}
