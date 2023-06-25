import { initGlobalAPI } from "./globalApi";
import { initMixin } from "./init";
import { lifeCycleMixin } from "./lifecycle";
import { initStateMixin } from "./state";
function Vue(options) {
    this._init(options);
}
initGlobalAPI(Vue)
initStateMixin(Vue)
initMixin(Vue); // 扩展了init方法
lifeCycleMixin(Vue);
export default Vue;