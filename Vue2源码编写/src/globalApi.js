export function initGlobalAPI(Vue){
    // 静态方法
    Vue.options = {}
    Vue.extend = function(options){
        function Sub(){
            this._init_()
        }
        Sub.prototype = Object.create(Vue.prototype) //  Sub.prototype._proto_ =  Vue.prototype
        Sub.options = options; // 保存用户传递的选项
        return Sub
    }
    Vue.options.components = {}
    Vue.component = function(id,definition){
        definition = typeof definition
    }
}