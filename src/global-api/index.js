import { set, del } from "../observe/index";
import { nextTick } from "../util/next-tick";
export function initGlobalAPI(Vue) {
  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;
}
