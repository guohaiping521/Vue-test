(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function initState(vm) {
    var opts = vm.$options; //数据来源 属性 方法 数据  计算属性 watch

    if (opts.props) {
      initProps(vm, opts.props);
    }

    if (opts.methods) {
      initMethods(vm, opts.props);
    }

    if (opts.data) {
      initData(vm);
    } else {
      observe(vm._data = {}, true
      /* asRootData */
      );
    }

    if (opts.computed) initComputed(vm, opts.computed);

    if (opts.watch && opts.watch !== nativeWatch) {
      initWatch(vm, opts.watch);
    }

    console.log(vm.$options);
  }

  function initProps(vm, propsOptions) {}

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options; //初始化状态

      initState(vm);
    };
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
