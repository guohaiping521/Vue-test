import { initMixin } from "./init";
import { renderMixin } from "./instance/render";
import { lifecycleMixin } from "./instance/lifecycle";
function Vue(options) {
  this._init(options);
}
initMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
export default Vue;
