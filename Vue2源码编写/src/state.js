import { observe } from "./observe/index";
import Watcher from "./observe/watcher";
import Dep from "./observe/dep";
export function initState(vm) {
    // 对数据进行劫持
    const opts = vm.$options;
    if (opts.data) {
        initData(vm);
    }
    if (opts.computed) {
        initComputed(vm)
    }
}
function Proxy(vm, target, key) {
    // 使用时候的劫持
    Object.defineProperty(vm, key, {
        get() {
            return vm[target][key]
        },
        set(newvalue) {
            vm[target][key] = newvalue
        }
    })
}
function initData(vm) {
    // 对data进行劫持
    let data = vm.$options.data;
    data = typeof data == "function" ? data.call(vm) : data;
    vm._data = data;
    // 将vm.data 用vm代理
    for (let key in data) {
        Proxy(vm, "_data", key);
    }
    observe(data);
}

function initComputed(vm) {
    const computed = vm.$options.computed
    const watchers = vm.computedWatcher = {} //将计算属性watcher保存到vm上
    for (let key in computed) {
        let userDef = computed[key]
        // 我们需要监控计算属性中get的变化
        let fn = typeof userDef === 'function' ? userDef : userDef.get
        watchers[key] = new Watcher(vm, fn, { lazy: true })
        defineComputed(vm, key, userDef)
    }
}
function defineComputed(target, key, userDef) {
    const setter = userDef.set || (() => { })
    Object.defineProperty(target, key, {
        get: createComputedGeeter(key),
        set: setter
    })
}
function createComputedGeeter(key) {
    // 我们需要监测是否要执行这个getter
    return function(){
        const watcher = this.computedWatcher[key]
        if(watcher.dirty){
            // 如果是脏的，则执行
            watcher.evaluate()
        }
        if(Dep.target){ //计算属性出栈后还有渲染过程，我应该让计算属性watcher里面的属性也去收集上一层watcher
            watcher.depend()
        }
        return watcher.value
    }
}