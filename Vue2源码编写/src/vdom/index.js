const isReservedTag = (tag) => {
    return ['a', 'button', 'p', 'div', 'ul', 'li', 'span'].includes(tag)
}
export function createElement(vm, tag, data = {}, ...children) {
    if (data == null) {
        data = {}
    }
    let key = data.key
    if (key) {
        delete data.key
    }
    if (isReservedTag(tag)) {
        return vnode(vm, tag, data, children, data.key, null)
    } else {
        // 创造一个组件的虚拟节点（包含组件的构造函数）
        let Ctor = vm.$options.components[tag]  // 组件的构造函数
        // // Ctor就是组件的定义，可能是一个Sub类，还有可能是组件的obj选项
        return createComponentVnode(vm, tag, key, data, children, Ctor)
    }
}
function createComponentVnode(vm, tag, key, data, children, Ctor) {
    if (typeof Ctor === 'object') {
        Ctor = vm.$options._base.extend(Ctor)
    }
    data.hook = {
        init(vnode){
            // 稍后创造真实节点的时候，如果是组件则调用此init方法
            // 保存组件的实例到虚拟节点上
            let instance = vnode.componentInstance = new vnode.componentOptions.Ctor
            instance.$mount() // instance.$el
        }
    }
    return vnode(vm, tag, data, children, key, null, { Ctor })
}
export function createTextNode(vm, text) {
    return vnode(vm, null, null, null, null, text)
}
function vnode(vm, tag, data, children, key, text, componentOptions) {
    return {
        vm, tag, data, children, key, text, componentOptions //组件的构造函数
    }
}
export function isSameVnode(vnode1, vnode2) {
    return vnode1.tag === vnode2.tag && vnode1.key === vnode2.key
}