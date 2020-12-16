import { observe } from "./observe/index.js";
import { proxy } from "./util/index.js";
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
function initProps(vm, propsOptions) {}
function initMethods(vm, methods) {}
function initData(vm) {
  let data = vm.$options.data;
  data = vm._data = typeof data === "function" ? data.call(vm) : data;
  for (const key in vm._data) {
    proxy(vm, "_data", key);
  }
  //mvvm模式:数据变化驱动视图变化
  observe(data);
}
function initComputed(vm, computed) {}
function initWatch(vm, watch) {}
