import { observe } from "./observe/index";

export function initState(vm) {
    // 对数据进行劫持
    const opts = vm.$options;
    if (opts.data) {
        initData(vm);
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
