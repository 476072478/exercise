export function createElm(vnode) {
    let { tag, data, children, text } = vnode;
    if (typeof tag === "string") {
        //元素
        vnode.el = document.createElement(tag); //后续我们需要diff算法，拿虚拟节点比对后更新dom
        patchProps(vnode.el, data);
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
function patchProps(el, props) {
    for (let key in props) {
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
        if (!isSameVnode(oldVnode, vnode)) {
            let el = createElm(vnode)
            oldVnode.el.parentNode.replaceChild(el, oldVnode.el)
            return el
        }
        let el = vnode.le = oldVnode.el // 复用老节点的元素
        // 是文本
        if (!oldVnode.tag) {
            if (oldVnode.text !== vnode.text) {
                el.textContent = vnode.text
            }
        }
        // 是标签
        console.log(oldVnode,vnode)
    }
}
// 每次更新页面的话，dom结果是不会变的，我调用render方法时，数据变化了会根据数据渲染成新的虚拟节点，用新的虚拟节点渲染dom
