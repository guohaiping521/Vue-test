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
let strats = Object.create(null);
let LIFECYCLE_HOOKS = [
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeUpdate",
  "updated",
  "beforeDestroy",
  "destroyed",
  "activated",
  "deactivated",
  "errorCaptured",
  "serverPrefetch",
];
LIFECYCLE_HOOKS.forEach((hook) => {
  strats[hook] = mergeHook;
});
function mergeHook(parentVal, childVal) {
  if (childVal) {
    if (parentVal) {
      return parentVal.concat(childVal);
    } else {
      if (Array.isArray(childVal)) {
        return childVal;
      } else {
        return [childVal];
      }
    }
  } else {
    return parentVal;
  }
}
export function mergeOptions(parent, child) {
  let options = {};
  for (let key in parent) {
    mergeField(key);
  }
  for (const key in child) {
    if (!parent.hasOwnProperty(key)) {
      mergeField(key);
    }
  }
  function mergeField(key) {
    if (strats[key]) {
      options[key] = strats[key](parent[key], child[key]);
      return;
    }
    if (typeof parent[key] === "object" && typeof child[key] === "object") {
      options[key] = {
        ...parent[key],
        ...child[key],
      };
    } else if (child[key] == null) {
      options[key] = parent[key];
    } else {
      options[key] = child[key];
    }
  }
  return options;
}
