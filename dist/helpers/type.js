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