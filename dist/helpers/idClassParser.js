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