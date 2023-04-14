import { compileToFunction } from "./compiler/index";
import { initState } from "./state";
import {mountComponent} from './lifecycle'
export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        //用于初始化操作
        const vm = this;
        vm.$options = options; //将用户的选项挂载到实例上
        // 初始化状态，初始化计算属性，watcher
        initState(vm);
        // todo...
        if (options.el) {
            vm.$mount(options.el);
        }
    };
    Vue.prototype.$mount = function (el) {
        const vm = this;
        el = document.querySelector(el);
        let ops = vm.$options;
        if (!ops.render) {
            //先查找有没有render函数
            let template;
            if (!ops.template && el) {
                //如果没有render函数有el
                template = el.outerHTML;
            } else {
                // 写了templat，就用写了的template
                if(el){
                    template = ops.template;
                }
            }
            if(template){
                // 这里需要对模板进行编译
                const render = compileToFunction(template)
                ops.render = render
            }
        }
        //将实例挂载到el上
        mountComponent(vm,el)
    };
}
