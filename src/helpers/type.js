export function isString(str) {
  return typeof str === 'string' || str instanceof String;
}

export function isArray(obj) {
  if (Array.isArray) {
    return Array.isArray(obj);
  }

  return Object.prototype.toString.call(obj) === '[object Array]';
}

export function isFunction(obj) {
  if (typeof /./ !== 'function' && typeof Int8Array !== 'object') {
    return typeof obj === 'function' || false;
  }

  return Object.prototype.toString.call(obj) === '[object Function]';
}

export function isNumber(obj) {
  return typeof obj === 'number' && isFinite(obj) && !isNaN(obj);
}
