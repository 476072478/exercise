export function createElement(vm,tag,data={},...children){
    return vnode(vm,tag,data,children,data.key,null)
}
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