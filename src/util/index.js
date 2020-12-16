export * from "./env";
export * from "./lang";
export function isObject(data) {
  return typeof data === "object" && data !== null;
}
export function proxy(vm, sourse, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[sourse][key];
    },
    set(newVal) {
      vm["_data"][key] = newVal;
    },
  });
}
