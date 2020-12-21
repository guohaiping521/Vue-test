import { initMixin } from "../init";
import { renderMixin } from "../instance/render";
import { lifecycleMixin } from "../instance/lifecycle";
import { initGlobalAPI } from "../initGlobalAPI/index";
function Vue(options) {
  this._init(options);
}
initMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
initGlobalAPI(Vue);
export default Vue;

//将template转换成ast语法树--》生成render方法--》生成虚拟DOM-->真实的dom
//重新生成虚拟dom-->更新dom
