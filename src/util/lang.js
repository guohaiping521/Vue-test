export function def(obj, key, value) {
  Object.defineProperty(obj, key, {
    enumerable: false,
    configurable: false,
    value,
  });
}
