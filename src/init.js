import Vue from ".";
import { initState } from "./state";
import { compileToFunctions } from "./compiler/index.js";

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = options;
    //初始化状态
    initState(vm);
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
  Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);
    if (!options.render) {
      let template = options.template;
      if (!template && el) {
        template = el.outerHTML;
      }
      //template转换为render方法
      const render = compileToFunctions(template);
      options.render = render;
    }
  };
}
