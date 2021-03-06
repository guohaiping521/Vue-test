import { mergeOptions } from "../util/index";
export function initGlobalAPI(Vue) {
  Vue.options = {};
  Vue.mixin = function (mixin) {
    //实现对象合并
    this.options = mergeOptions(this.options, mixin);
  };
  Vue.mixin({
    a: 1,
    beforeCreate() {},
  });
  Vue.mixin({
    b: 2,
    beforeCreate() {},
  });
}
