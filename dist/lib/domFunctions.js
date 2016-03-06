'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.el = el;

var _Element = require('./Element');

var _Element2 = _interopRequireDefault(_Element);

var _idClassParser = require('../helpers/idClassParser');

var _type = require('../helpers/type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function el() {
  var tagName = arguments.length <= 0 || arguments[0] === undefined ? 'div' : arguments[0];
  var attr = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var children = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

  if ((0, _type.isArray)(tagName) || (0, _type.isFunction)(tagName)) {
    children = tagName;
    tagName = 'div';
    attr = {};
  }

  if ((0, _type.isArray)(attr) || (0, _type.isFunction)(attr)) {
    children = attr;
    attr = {};
  }

  var attributes = attr;

  if ((0, _type.isString)(attr)) {
    attributes = (0, _idClassParser.idClassParser)(attr);
  }

  return new _Element2.default(tagName, attributes, children);
}