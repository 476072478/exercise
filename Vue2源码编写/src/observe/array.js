// 获取数组的原型
let oldArrayProto = Array.prototype
export let newArrayProto = Object.create(oldArrayProto)

let methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice'
]
methods.forEach(method => {
    newArrayProto[method] = function (...args) {
        const ob = this.__ob__
        const result = oldArrayProto[method].call(this, ...args)
        let inserted
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break
            case 'splice':
                inserted = args.slice(2)
            default:
                break
        }
        if(inserted){
            ob.observeArray(inserted)
        }
        return result
    }
}) 
