import { initMixin } from "./init";
import { lifeCycleMixin } from "./lifecycle";
import Watcher, { nextTick } from "./observe/watcher";
function Vue(options) {
    this._init(options);
}
Vue.prototype.$nextTick = nextTick;
initMixin(Vue); //扩展了init方法
lifeCycleMixin(Vue);
export default Vue;
// watch最终调用的是这个方法
Vue.prototype.$watch = function (exprOrFn, cb) {
    new Watcher(this, exprOrFn, { user: true }, cb)
}


