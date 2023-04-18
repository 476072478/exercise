import Dep, { popTarget, pushTarget } from './dep'

let queeu = []
let has = {}
let pending = false //防抖

function flushSchedulerQueue() {
    let flushQueue = queeu.slice(0)
    queeu = []
    has = {}
    pending = false
    flushQueue.forEach(q => q.run()) //在刷新的过程中可能还有新的watcher，重新放到queue中
}

let callbacks = []
let waiting = false
function flushCallbacks() {
    waiting = false
    let cbs = callbacks.slice(0)
    callbacks = []
    cbs.forEach(cb => cb())
}
// nextTick采用的是优雅降级的方式
let timeFunc
if (Promise) {
    timeFunc = () => {
        Promise.resolve().then(flushCallbacks)
    }
} else if (MutationObserver) {
    let observer = new MutationObserver(flushCallbacks)
    let textNode = createTextNode(1)
    observer.observe(textNode, {
        characterData: true
    })
    timeFunc = () => {
        textNode.textContent = 2
    }
} else if (setImmediate) {
    timeFunc = () => {
        setImmediate(flushCallbacks)
    }
} else {
    setTimeout(() => {
        flushCallbacks()
    }, 0);
}
export function nextTick(cb) { //先内部的还是先用户的？
    callbacks.push(cb)
    if (!waiting) {
        timeFunc() //最后一起刷新
    }
}
function queueWatcher(watcher) {
    const id = watcher.id
    if (!has[id]) {
        queeu.push(watcher)
        has[id] = true
        // 不管update执行多少次，但是最终只执行一次
        if (!pending) {
            nextTick(flushSchedulerQueue);
            pending = true
        }
    }
}

let id = 0
class Watcher {
    constructor(vm, exprOrFn, options, cb) { // 不同组件有不同watcher
        this.id = id++
        this.renderWatcher = options //是一个渲染过程
        if (typeof exprOrFn === 'string') {
            this.getter = function () {
                return vm[exprOrFn]
            }
        } else {
            this.getter = exprOrFn // getter意味着调用这个函数会发生取值操作
        }
        this.deps = [] //后续我们实现计算属性和清理工作会用到
        this.depsId = new Set()
        this.lazy = options.lazy
        this.dirty = this.lazy //缓存
        this.cb = cb
        this.vm = vm
        this.user = options.user // 标识是否是用户自己的watcher
        this.value = this.lazy ? undefined : this.get()
    }
    evaluate() {
        this.value = this.get()
        this.dirty = false
    }
    get() {
        pushTarget(this) //静态属性只有一份
        let value = this.getter.call(this.vm) //会去vm上取值
        popTarget()
        return value
    }
    addDep(dep) { //一个组件对应多个属性，重复的属性也不用记录
        let id = dep.id
        if (!this.depsId.has(id)) {
            this.deps.push(dep)
            this.depsId.add(id) //watcher已经记住dep，并且已经去重
            dep.addSub(this)
        }
    }
    depend() {
        let i = this.deps.length
        while (i--) {
            this.deps[i].depend() //让计算属性watcher也收集渲染过程
        }
    }
    update() {
        if (this.lazy) {
            //如果是计算属性,依赖的值变化了，就标值计算属性是脏值
            this.dirty = true
        } else {
            queueWatcher(this) //把当前的watcher暂存起来
        }
    }
    run() {
        let oldValue = this.value
        let newValue = this.get()
        if (this.user) {
            this.cb.call(this.vm,oldValue, newValue)
        }
    }
}
// 需要给每个属性增加一个dep，目的就是收集watcher
// 一个组件中有多少属性（n个属性对应一个组件） n个dep对应一个watcher
// 1个属性对应多个组件 1个dep对应多个watcher
// 多对多的关系
export default Watcher