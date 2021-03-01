import Dep from "../observe/dep.js";
import { observe } from "../observe/index.js";
import Watcher from "../observe/watcher.js";
import { proxy } from "../util/index.js";
import { isPlainObject } from "../util/lang.js";
export function initState(vm) {
  const opts = vm.$options;
  //数据来源 属性 方法 数据  计算属性 watch
  if (opts.props) {
    initProps(vm, opts.props);
  }
  if (opts.methods) {
    initMethods(vm, opts.props);
  }
  if (opts.data) {
    initData(vm);
  }
  if (opts.computed) initComputed(vm, opts.computed);
  if (opts.watch) {
    initWatch(vm, opts.watch);
  }
}
function initProps(vm, propsOptions) { }
function initMethods(vm, methods) { }
function initData(vm) {
  let data = vm.$options.data;
  data = vm._data = typeof data === "function" ? data.call(vm) : data;
  for (const key in vm._data) {
    proxy(vm, "_data", key);
  }
  //mvvm模式:数据变化驱动视图变化
  observe(data);
}
let computedWatcherOptions = { lazy: true }
let sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: () => { },
  set: () => { },
}
function initComputed(vm, computed) {
  let watchers = vm._computedWatchers = Object.create(null)
  for (const key in computed) {
    let userDef = computed[key];
    let getter = typeof userDef === 'function' ? userDef : userDef.get;
    watchers[key] = new Watcher(vm, getter, () => { }, computedWatcherOptions);
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (key in vm._data) {
      console.log("data already defined ");
    } else if (vm.$options.props && key in vm.$options.props) {
      console.log("props already defined ");
    }
  }
}
function defineComputed(target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
  } else {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = userDef.set || (() => { })
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}
function createComputedGetter(key) {
  return function () {
    let watcher = this._computedWatchers[key];
    if (watcher.dirty) {
      watcher.evaluate();
    }
    if (Dep.target) {
      watcher.depend();
    }
    return watcher.value
  }
}
function initWatch(vm, watch) {
  for (const key in watch) {
    const handler = watch[key];
    if (Array.isArray(handler)) {
      handler.forEach(watch => {
        createWatcher(vm, key, watch);
      });
    } else {
      createWatcher(vm, key, handler);
    }
  }
}
function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler
  }
  //说明是方法名称需要从methods取
  if (typeof handler === 'string') {
    handler = vm.$options.methods[handler]
  }

  return vm.$watch(expOrFn, handler, options);
}

export function stateMixin(Vue) {
  Vue.prototype.$watch = function (expOrFn, cb, options) {
    const vm = this;
    options = options || {}
    options.user = true
    const watcher = new Watcher(vm, expOrFn, cb, options);
  }
}