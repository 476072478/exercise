let toProxy = new WeakMap()  // 集合和hash表
let toRaw = new WeakMap()
function isObject(target) {
    return typeof target === 'object' && target !== null
}
function reactive(target) {
    return createReactiveObject(target)
}
function hasOwn(target, key) {
    return target.hasOwnProperty(key)
}
function createReactiveObject(target) {
    if (!isObject(target)) {
        return target
    }
    if (toProxy.get(target)) {
        return toProxy.get(target)
    }
    if (toRaw.has(target)) {
        return target
    }
    let baseHandle = {
        get(target, key, receiver) {
            let result = Reflect.get(target, key, receiver)
            // 收集依赖
            track(target, key) // 如果目标上的 这个key变化了，重新让数组中的effect重新执行即可
            return isObject(result) ? reactive(result) : result
        },
        set(target, key, value, receiver) {
            let oldValue = target[key]
            let res = Reflect.set(target, key, value, receiver)
            if (!hasOwn(target, key)) {
                trigger(target, 'add', key)
            } else if (oldValue !== value) {
                trigger(target, 'set', key)
            } else {
                console.log('🚀 ~ file ~ text:', '执行咯')
            }// 为了屏蔽无意义的修改
            return res
        },
        deleteProperty(target, key) {
            let res = Reflect.deleteProperty(target, key)
            return res
        }
    }
    let observe = new Proxy(target, baseHandle)
    toProxy.set(target, observe)
    toRaw.set(observe, target)
    return observe
}

let activeEffectStack = [] // 栈形结构
let targetsMap = new WeakMap()
function track(target, key) { // 如果这个target中的key变化了 就执行数组内的方法
    let effect = activeEffectStack[activeEffectStack.length - 1]
    if (effect) { // 有对应关系才创建关联
        let depsMap = targetsMap.get(target)
        if (!depsMap) {
            targetsMap.set(target, depsMap = new Map)
        }
        let deps = depsMap.get(key)
        if (!deps) {
            depsMap.set(key, deps = new Set())
        }
        if (!deps.has(effect)) {
            deps.add(effect)
        }
        // 动态创建依赖关系
    }

}
function trigger(target, type, key) {
    let depsMap = targetsMap.get(target)
    if (depsMap) {
        let deps = depsMap.get(key)
        if (deps) {
            deps.forEach(effect => {
                // 将当前对应的effect依次执行
                effect()
            });
        }
    }
}
// 栈：先进后出
// 响应式副作用
// {
//     target: {
//         key: [fn, fn]
//     }
// }
function effect(fn) {
    let effect = createReactiveEffect(fn)
    effect() // 默认先执行一次
}
function createReactiveEffect(fn) {
    let effect = function () {
        try {
            activeEffectStack.push(effect)
            fn()
        } finally {
            activeEffectStack.pop()
        }
    }
    return effect
}
let object = { name: 'xiaotang', key: "123" }
let proxy = reactive(object)
// 收集依赖，发布订阅
effect(() => {
    console.log('🚀 ~ file ~ text:', proxy.name)
    console.log('🚀 ~ file ~ text:', proxy.key)
})
proxy.name = 'hhhhh'
proxy.key = 'hhhhh'