export function initGlobalAPI(Vue) {
  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;
}
