import Watcher from "./observe/watcher"
import { createElement } from "./vdom/index"
import { createTextNode } from "./vdom/index"
import { patch } from "./vdom/patch"

export function lifeCycleMixin(Vue) {
    Vue.prototype._c = function () {
        // 创造对应的虚拟节点，进行渲染
        return createElement(this, ...arguments)
    }
    Vue.prototype._v = function () {
        return createTextNode(this, ...arguments)
    }
    Vue.prototype._s = function (value) { //将数据转化成字符串，因为使用变量对应的结果可能是一个对象
        if (typeof value === 'object' && value !== null) {
            return JSON.stringify(value)
        }
        return value
    }
    Vue.prototype._render = function () {
        const vm = this
        const render = vm.$options.render
        let vnode = render.call(vm)
        return vnode
    }
    Vue.prototype._update = function (vnode) { //将虚拟节点变成真实节点
        // 将Vnode渲染到el元素中
        const vm = this
        const el = vm.$el
        const prevVnode = vm._vnode
        vm._vnode = vnode //把组件第一次产生的虚拟节点保存到_vnode上
        if (prevVnode) {
            // 之前渲染过了
            vm.$el = patch(prevVnode, vnode)
        } else {
            vm.$el = patch(el, vnode)
        }
    }
}
export function mountComponent(vm, el) {
    debugger
    //实现页面的挂载流程
    // 先将el挂载到实例上
    vm.$el = el
    const updataComponent = () => {
        // 需要调用生成的render函数获取到虚拟节点 -》 生成真实的dom
        vm._update(vm._render())
    }
    new Watcher(vm, updataComponent, true)
    //如果稍后数据变化，也调用这个函数重新执行
    // 观察者模式
}
export function callHook(vm, hook) {
    // 调用钩子函数
    const handlers = vm.$options[hook]
    if (handlers) {
        handlers.forEach(handler => {
            handler.call(vm)
        });
    }
}