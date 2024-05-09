let id = 0
export default class Dep{
    constructor(){
        this.id = id++  //属性的dep要收集watcher
        this.subs = []  //这里存放
    }
    depend(){
        // 这里我们不希望放重复的wacher，而且刚才只是一个单向的关系
        // watcher记录dep
        // this.subs.push(Dep.target)
        Dep.target.addDep(this)  // 让watcher记住dep
    }
    addSub(watcher){
        this.subs.push(watcher)
    }
    notify(){
        this.subs.forEach(watcher => watcher.update()) //告诉watcher要更新了
    }
}
let stack = []
export function pushTarget(watcher){
    stack.push(watcher)
    Dep.target = watcher
}
export function popTarget(){
    stack.pop()
    Dep.target = stack[stack.length - 1]
}
Dep.target = null