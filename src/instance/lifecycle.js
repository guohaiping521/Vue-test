import Watcher from "../observe/watcher";
export function lifecycleMixin(Vue) {
  console.log("Vue", Vue);
  Vue.prototype._update = function (Vue) {};
}
export function mountComponent(vm, el) {
  //渲染页面
  let updateComponent = () => {
    //vm._render()通过render方法返回虚拟dom，然后进行更新
    vm._update(vm._render());
  };
  //渲染watcher，视图变化，渲染更新
  new Watcher(vm, updateComponent, () => {});
}
