import { mergeOptions } from "./utils"
export function initGlobalAPI(Vue) {
    Vue.options = {}
    Vue.mixin = function (mixin) {
        // 我们期望将用户的选项和全局的options进行合并
        this.options = mergeOptions(this.options, mixin)
        return this
    }
    Vue.extend = function (options) {
        function Sub(options = {}) { // 最终使用一个组件，就是new一个实例
            this._init(options) // 默认对子类进行初始化
        }
        Sub.prototype = Object.create(Vue.prototype) // Sub.prototype._proto_ =  Vue.prototype
        Sub.prototype.constructor = Sub
        Sub.options = options; // 保存用户传递的选项
        return Sub
    }
    Vue.options.components = {}
    Vue.component = function (id, definition) {
        definition = typeof definition
    }
}