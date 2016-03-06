'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _namespaces = require('../config/namespaces');

var _namespaces2 = _interopRequireDefault(_namespaces);

var _type = require('../helpers/type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var svgxlink = 'http://www.w3.org/1999/xlink';

function createElm(tag, ns, attrs, doc) {
  var elm = doc.createElementNS(ns, tag);

  for (var i in attrs) {
    if (attrs.hasOwnProperty(i) && (0, _type.isString)(attrs[i])) {
      elm.setAttribute(i, attrs[i]);
    }
  }

  return elm;
}

var Element = function () {
  function Element(tagName, attributes, children) {
    _classCallCheck(this, Element);

    if (!(0, _type.isString)(tagName)) {
      throw new Error('tagName should be a string');
    }

    if ((typeof attributes === 'undefined' ? 'undefined' : _typeof(attributes)) !== 'object') {
      throw new Error('Attributes should be an object');
    }

    this.tagName = tagName.toLowerCase();
    this.attributes = attributes;
    this.children = children;

    if (this.tagName === 'svg') {
      this.attributes.xlink = svgxlink;
    }
  }

  _createClass(Element, [{
    key: 'compile',
    value: function compile(props) {
      var doc = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

      if (!doc) {
        throw new Error('No "document" object found');
      }

      var namespace = this.tagName === 'svg' ? _namespaces2.default.svg : _namespaces2.default.html;

      var elm = createElm(this.tagName, namespace, this.attributes, doc);

      var children = this.children;

      if (typeof children === 'function') {
        children = children(props);
      }

      if (Array.isArray(children)) {
        return children.reduce(function (element, child) {
          var append = undefined;

          if (child instanceof Element) {
            append = child.compile(props);
          }

          if ((0, _type.isString)(child)) {
            append = doc.createTextNode(child);
          }

          element.appendChild(append);

          return element;
        }, elm);
      }

      if ((0, _type.isString)(children) || typeof children === 'number') {
        elm.appendChild(doc.createTextNode(children));
      }

      return elm;
    }
  }]);

  return Element;
}();

exports.default = Element;