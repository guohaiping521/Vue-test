export function def(obj, key, value, enumerable) {
  Object.defineProperty(obj, key, {
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
    value,
  });
}
