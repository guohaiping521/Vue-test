import { createElement } from "../vdom/create-element";
import { createTextVNode } from "../vdom/vnode";
import { nextTick } from "../util/next-tick";
export function renderMixin(Vue) {
  //创建元素虚拟节点
  Vue.prototype._c = function () {
    return createElement(...arguments);
  };
  //创建文本的虚拟节点
  Vue.prototype._v = function (val) {
    return createTextVNode(val);
  };
  //JSON.stringify
  Vue.prototype._s = function (val) {
    return val == null
      ? ""
      : typeof val === "object"
        ? JSON.stringify(val)
        : val;
  };
  Vue.prototype._render = function () {
    const vm = this;
    const { render } = vm.$options;
    return render.call(vm);
  };
}
