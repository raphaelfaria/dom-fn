import Element from './Element';
import { idClassParser } from '../helpers/idClassParser';
import { isString } from '../helpers/type';

export function el(tagName = 'div', attr = {}, children = '') {
  let attributes = attr;

  if (isString(attr)) {
    attributes = idClassParser(attr);
  }

  return new Element(tagName, attributes, children);
}
