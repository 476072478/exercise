import Dep from './dep'
let id = 0
class Watcher {
    constructor(vm,fn,options) { // 不同组件有不同watcher
        this.id = id++
        this.renderWatcher = options //是一个渲染过程
        this.getter = fn // getter意味着调用这个函数会发生取值操作
        this.deps = [] //后续我们实现计算属性和清理工作会用到
        this.depsId = new Set()
        this.get()
    }
    get(){
        Dep.target = this //静态属性只有一份
        this.getter() //会去vm上取值
        Dep.target = null
    }
    addDep(dep){ //一个组件对应多个属性，重复的属性也不用记录
        let id = dep.id
        if(!this.depsId.has(id)){
            this.deps.push(dep)
            this.depsId.add(id) //watcher已经记住dep，并且已经去重
            dep.addSub(this)
        }
    }
    update(){
        this.get()
    }
}
// 需要给每个属性增加一个dep，目的就是收集watcher
// 一个组件中有多少属性（n个属性对应一个组件） n个dep对应一个watcher
// 1个属性对应多个组件 1个dep对应多个watcher
// 多对多的关系
export default Watcher