const idRegex = /(?:#)(?!--|-\d|\d)([^#\.]+)/g;
const classRegex = /(?:\.)(?!--|-\d|\d)([^#\.]+)/g;

function verifySelector(selector) {
  const str = selector.trim();

  if (str.indexOf(' ') >= 0) {
    throw new Error('Invalid selector');
  }

  return true;
}

function getMatches(selector, regex) {
  let match;
  const matches = [];

  while (match = regex.exec(selector)) {
    matches.push(match[1]);
  }

  return matches;
}

export function getId(selector) {
  verifySelector(selector);

  const idMatches = getMatches(selector, idRegex);
  return idMatches[idMatches.length - 1] || false;
}

export function getClass(selector) {
  verifySelector(selector);
  return getMatches(selector, classRegex);
}

export function idClassParser(selector) {
  const idClass = {};

  const id = getId(selector);
  const classes = getClass(selector);

  if (id) {
    idClass.id = id;
  }

  if (classes.length) {
    idClass.class = classes.join(' ');
  }

  return idClass;
}
