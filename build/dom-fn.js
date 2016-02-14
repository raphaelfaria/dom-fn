(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.domFn = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  html: 'http://www.w3.org/1999/xhtml',
  svg: 'http://www.w3.org/2000/svg'
};

},{}],2:[function(_dereq_,module,exports){
'use strict';

var _domFunctions = _dereq_('./lib/domFunctions');

var domFn = {
  el: _domFunctions.el
};

module.exports = domFn;

},{"./lib/domFunctions":6}],3:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getId = getId;
exports.getClass = getClass;
exports.idClassParser = idClassParser;
var idRegex = /(?:#)(?!--|-\d|\d)([^#\.]+)/g;
var classRegex = /(?:\.)(?!--|-\d|\d)([^#\.]+)/g;

function verifySelector(selector) {
  var str = selector.trim();

  if (str.indexOf(' ') >= 0) {
    throw new Error('Invalid selector');
  }

  return true;
}

function getMatches(selector, regex) {
  var match = undefined;
  var matches = [];

  while (match = regex.exec(selector)) {
    matches.push(match[1]);
  }

  return matches;
}

function getId(selector) {
  verifySelector(selector);

  var idMatches = getMatches(selector, idRegex);
  return idMatches[idMatches.length - 1] || false;
}

function getClass(selector) {
  verifySelector(selector);
  return getMatches(selector, classRegex);
}

function idClassParser(selector) {
  var idClass = {};

  var id = getId(selector);
  var classes = getClass(selector);

  if (id) {
    idClass.id = id;
  }

  if (classes.length) {
    idClass.class = classes.join(' ');
  }

  return idClass;
}

},{}],4:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.isString = isString;
exports.isArray = isArray;
exports.isFunction = isFunction;
function isString(str) {
  return typeof str === 'string' || str instanceof String;
}

function isArray(obj) {
  if (Array.isArray) {
    return Array.isArray(obj);
  }

  return Object.prototype.toString.call(obj) === '[object Array]';
}

function isFunction(obj) {
  if (typeof /./ !== 'function' && (typeof Int8Array === 'undefined' ? 'undefined' : _typeof(Int8Array)) !== 'object') {
    return typeof obj === 'function' || false;
  }

  return Object.prototype.toString.call(obj) === '[object Function]';
}

},{}],5:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _namespaces = _dereq_('../config/namespaces');

var _namespaces2 = _interopRequireDefault(_namespaces);

var _type = _dereq_('../helpers/type');

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

},{"../config/namespaces":1,"../helpers/type":4}],6:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.el = el;

var _Element = _dereq_('./Element');

var _Element2 = _interopRequireDefault(_Element);

var _idClassParser = _dereq_('../helpers/idClassParser');

var _type = _dereq_('../helpers/type');

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

},{"../helpers/idClassParser":3,"../helpers/type":4,"./Element":5}]},{},[2])(2)
});