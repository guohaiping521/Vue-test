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
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
  console.log(vm.$options);
}
function initProps(vm, propsOptions) {}
function initProps(vm, methods) {}
function initData(vm) {
  let data = vm.$options.data;
  data = typeof data === "function" ? data.call(vm) : data;
  console.log(data);
}
function initComputed(vm, computed) {}
function initWatch(vm, watch) {}
