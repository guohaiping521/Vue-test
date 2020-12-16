import Watcher from "../observe/watcher";
import { patch } from "../vdom/patch";
export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    vm.$el = patch(vm.$el, vnode); //用虚拟节点创建出真实节点，替换掉真实的el节点
  };
}
export function mountComponent(vm, el) {
  //渲染页面
  let updateComponent = () => {
    vm.$el = el;
    //vm._render()通过render方法返回虚拟dom，然后进行更新
    vm._update(vm._render());
  };
  //渲染watcher，视图变化，渲染更新  true代表他是一个渲染的Watcher
  new Watcher(vm, updateComponent, () => {}, true);
  updateComponent();
}
