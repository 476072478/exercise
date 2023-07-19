/*
 * @Author: 小唐 476072478@qq.com
 * @Date: 2023-03-03 09:58:34
 * @LastEditors: 小唐 476072478@qq.com
 * @LastEditTime: 2023-04-18 16:10:58
 * @FilePath: \Vue2源码编写\src\init.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { compileToFunction } from "./compiler/index";
import { initState } from "./state";
import { callHook, mountComponent } from './lifecycle'
import { mergeOptions } from "./utils";
export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        // 用于初始化操作
        const vm = this;

        vm.$options = mergeOptions(this.constructor.options, options); // 将用户的选项挂载到实例上

        callHook(vm, 'beforeCreate')
        // 初始化状态，初始化计算属性，watcher
        initState(vm);
        callHook(vm, 'created')
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
            // 先查找有没有render函数
            let template;
            if (!ops.template && el) {
                // 如果没有render函数有el
                template = el.outerHTML;
            } else {
                // 写了templat，就用写了的template
                template = ops.template;
            }
            if (template) {
                // 这里需要对模板进行编译
                const render = compileToFunction(template)
                ops.render = render
            }
        }
        // 将实例挂载到el上
        mountComponent(vm, el)
    };
}
