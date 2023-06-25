const isReservedTag = (tag)=>{
    return ['a','button','p','div','ul','li','span'].includes(tag)
}
export function createElement(vm,tag,data={},...children){
    if(isReservedTag(tag)){
        return vnode(vm,tag,data,children,data.key,null)
    }else{
        // 创造一个组件的虚拟节点（包含组件的构造函数）
        let Ctor = vm.$options.component[tag]
        // Ctor就是组件的定义，可能是一个Sub类，还有可能是组件的obj选项
        return createComponentVnode(vm,)
    }
}
function createComponentVnode(vm,tag,key,data,children,Ctor)
export function createTextNode(vm,text){
    return vnode(vm,null,null,null,null,text)
}
function vnode(vm,tag,data,children,key,text){
    return {
        vm,tag,data,children,key,text
    }
}
export function isSameVnode(vnode1,vnode2){
    return vnode1.tag === vnode2.tag && vnode1.key === vnode2.key
}