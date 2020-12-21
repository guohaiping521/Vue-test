import { initState } from "./state";
import { compileToFunctions } from "./compiler/index.js";
import { mountComponent } from "./instance/lifecycle";
import { mergeOptions } from "./util/index";
import { callHook } from "./instance/lifecycle";
import { nextTick } from "./util/next-tick";
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = mergeOptions(vm.constructor.options, options);
    callHook(vm, "beforeCreate");
    //初始化状态
    initState(vm);
    callHook(vm, "created");
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
    mountComponent(vm, el);
  };
  Vue.prototype.$nextTick = nextTick;
}
