import { initMixin } from "./init"
import { lifeCycleMixin } from './lifecycle'
function Vue(options) {
    this._init(options)
}
initMixin(Vue); //扩展了init方法
lifeCycleMixin(Vue)
export default Vue