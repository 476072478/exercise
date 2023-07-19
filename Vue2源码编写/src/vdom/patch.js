import { isSameVnode } from "./index";

function createComponent(vnode) {
    let i = vnode.data
    if ((i = i.hook) && (i = i.init)) {
        i(vnode) //初始化组件
    }
    console.log('🚀 ~ file ~ text:',vnode)
    if(vnode.componentInstance){
        return true
    }
}
export function createElm(vnode) {
    let { tag, data, children, text } = vnode;
    if (typeof tag === "string") {
        // 创建真实元素 也要区分是组件还是元素
        if (createComponent(vnode)) { //组件
            return vnode.componentInstance.$el
        }
        vnode.el = document.createElement(tag); //后续我们需要diff算法，拿虚拟节点比对后更新dom
        patchProps(vnode.el, {}, data);
        children.forEach((children) => {
            // 递归渲染
            vnode.el.appendChild(createElm(children));
        });
    } else {
        // 文本
        vnode.el = document.createTextNode(text);
    }
    return vnode.el; //从根虚拟节点创建真实节点
}
function patchProps(el, oldprops = {}, props = {}) {
    // 老的属性中有，新的没有，要删除老的
    let oldStyles = oldprops.style || {}
    let newStyles = props.style || {}
    for (let key in oldStyles) { // 老的样式中有，新的样式中没有则删除
        if (!newStyles[key]) {
            el.style[key] = ''
        }
    }
    for (let key in oldprops) { // 老的属性中有，新的没有删除属性
        if (!props[key]) {
            el.removeAttribute(key)
        }
    }
    for (let key in props) { // 用新的覆盖老的
        if (key === "style") {
            for (let styleName in props[key]) {
                el.style[styleName] = props.style[styleName];
            }
        } else {
            el.setAttribute(key, props[key]);
        }
    }
}
export function patch(oldVnode, vnode) {
    if(!oldVnode){ // 这就是组件的挂载
        return createElm(vnode) // vm.$el 对应的就是组件渲染的结果
    }
    const isRealElement = oldVnode && oldVnode.nodeType; // 如果有说明他是一个元素
    if (isRealElement) {
        const oldElm = oldVnode;
        // 需要获取父节点，将当前节点的下一个元素作为参照物将他插入，之后删除老节点
        const parentNode = oldElm.parentNode;
        let el = createElm(vnode);
        parentNode.insertBefore(el, oldElm.nextSibling);
        parentNode.removeChild(oldElm);
        return el;
    } else {
        // diff算法
        // 两个节点不是同一个节点，直接删除老的换上新的（没有比对了）
        // 两个节点是同一个节点，（判断节点的tag和节点的key） 比较两个节点的属性是否有差异（复用老的节点，将差异的属性更新）
        // 节点比较完毕后，需要比较两个节点的儿子
        patchVonde(oldVnode, vnode)
    }
}
function mountChildren(el, newChildren) {
    for (let i = 0; i < newChildren.length; i++) {
        let child = newChildren[i]
        el.appendChild(createElm(child))
    }
}
function patchVonde(oldVnode, vnode) {
    if (!isSameVnode(oldVnode, vnode)) {
        let el = createElm(vnode)
        oldVnode.el.parentNode.replaceChild(el, oldVnode.el)
        return el
    }
    // 文本的情况，文本我们期望比较一下文本的内容
    let el = vnode.el = oldVnode.el // 复用老节点的元素
    if (!oldVnode.tag) { // 是文本
        if (oldVnode.text !== vnode.text) {
            el.textContent = vnode.text
        }
        return
    }
    // console.log(oldVnode, vnode)
    // 是标签 标签我们需要比对标签的属性
    patchProps(el, oldVnode.data, vnode.data)

    // 比较儿子节点，一方有儿子，一方没儿子
    // 两方都有儿子
    let oldChildren = oldVnode.children || []
    let newChildren = vnode.children || []
    if (oldChildren.length > 0 && newChildren.length > 0) {
        // 两方都有儿子
        updateChildren(el, oldChildren, newChildren)
    } else if (newChildren.length > 0) {
        mountChildren(el, newChildren)
    } else if (oldChildren.length > 0) {
        el.innerHTML = ''
    }
    return el
}
function updateChildren(el, oldChildren, newChildren) {
    // 双指针
    let oldStartIndex = 0
    let newStartIndex = 0
    let oldEndIndex = oldChildren.length - 1
    let newEndIndex = newChildren.length - 1
    let oldStartVnode = oldChildren[0]
    let newStartVnode = newChildren[0]
    let oldEndVnode = oldChildren[oldEndIndex]
    let newEndVnode = newChildren[newEndIndex]
    function makeIndexByKey(children) {
        let map = {}
        children.forEach((child, index) => {
            map[child.key] = index
        })
        return map
    }
    let map = makeIndexByKey(oldChildren)
    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) { // 有任何一个不满足则停止
        if (!oldStartVnode) {
            oldStartVnode = oldChildren[++oldStartIndex]
        } else if (!oldEndVnode) {
            oldEndVnode = oldChildren[--oldStartIndex]
        }
        // 双方有一方头指针，大于尾部指针则停止循环 
        // 比较开头节点
        if (isSameVnode(oldStartVnode, newStartVnode)) {
            patchVonde(oldStartVnode, newStartVnode) //如果是相同节点则递归比较子节点
            oldStartVnode = oldChildren[++oldStartIndex]
            newStartVnode = newChildren[++newStartIndex]
        } else if (isSameVnode(oldEndVnode, newEndVnode)) {
            patchVonde(oldEndVnode, newEndVnode)
            oldEndVnode = oldChildren[--oldEndIndex]
            newEndVnode = newChildren[--newEndIndex]
            // 比较尾部节点
        } else if (isSameVnode(oldEndVnode, newStartVnode)) {
            patchVonde(oldEndVnode, newStartVnode)
            el.insertBefore(oldEndVnode.el, oldStartVnode.el)
            oldEndVnode = oldChildren[--oldEndIndex]
            newStartVnode = newChildren[++newStartIndex]
            // 交叉比对 abcd - > dabc
        } else if (isSameVnode(oldStartVnode, newEndVnode)) {
            patchVonde(oldStartVnode, newEndVnode)
            el.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling)
            oldStartVnode = oldChildren[++oldStartIndex]
            newEndVnode = newChildren[--newEndIndex]
            // 交叉比对 dabc - > abcd
        } else {
            // 乱序比对，尽可能的复用原来的dom
            // 根据老的列表做一个映射关系，用新的去找，找到则移动，找不到则添加，最后多余的就删除
            let moveIndex = map[newStartVnode.key] //如果拿到则说明是我要移动的索引
            if (moveIndex !== undefined) {
                let moveVnode = oldChildren[moveIndex] // 找到对应的虚拟节点
                el.insertBefore(moveVnode.el, oldStartVnode.el)
                oldChildren[moveIndex] = undefined // 不能删，删则导致数组塌陷，表示这个节点已经移动走了
                patchVonde(moveVnode, newStartVnode)
            } else {
                el.insertBefore(createElm(newStartVnode), oldStartVnode.el)
            }
            newStartVnode = newChildren[++newStartIndex]
        }
    }
    if (newStartIndex <= newEndIndex) { // 新得多了，多余的就插入进去
        for (let i = newStartIndex; i <= newEndIndex; i++) {
            let childEL = createElm(newChildren[i])
            // 这里可能是向后追加，还有可能向前追追加
            let anchor = newChildren[newEndIndex + 1] ? newChildren[newEndIndex + 1].el : null  // 获取下一个元素
            el.insertBefore(childEL, anchor); // anchor为null的时候则会认为是appednChild
        }
    }
    if (oldStartIndex <= oldEndIndex) { // 老的多了，多的就删除
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
            if (oldChildren[i]) {
                let childEL = oldChildren[i].el
                el.removeChild(childEL)
            }
        }
    }
}
// 每次更新页面的话，dom结果是不会变的，我调用render方法时，数据变化了会根据数据渲染成新的虚拟节点，用新的虚拟节点渲染dom