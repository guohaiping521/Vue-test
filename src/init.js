import { initState } from "./state";
import { compileToFunctions } from "./compiler/index.js";
import { mountComponent } from "./instance/lifecycle";
import { mergeOptions } from "./util/index";
import { callHook } from "./instance/lifecycle";

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
  //模板渲染顺序
  /*
  1.默认会先查找用户传入的render函数
  2.如果没有render函数，查找template
  3.如果也没有template函数，会用el对应的元素进行渲染
  （不建议用template，还得自己ast语法树巴拉的，最好用render）
  */
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
}
