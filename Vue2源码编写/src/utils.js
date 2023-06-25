// 静态方法
const strats = {}
const LIFECYCLE = [
    'beforeCreate',
    'created'
]
LIFECYCLE.forEach(hook => strats[hook] = function (p, c) {
    // {} {created:function(){}} => {created:[fn]}  第一次合并
    // {created:[fn]} {created:function(){}} => {created:[fn,fn]}
    if (c) {
        // 如果儿子有父亲有，父亲肯定是数组，让父亲和儿子拼在一起
        if (p) {
            return p.concat(c)
        } else {
            // 第一次，父亲没有，儿子有，将儿子包装成数组
            return [c]
        }
    } else {
        // 如果儿子没有，直接返回父亲
        return p
    }
})
export function mergeOptions(parent, child) {
    const options = {}
    for (let key in parent) { // 循环老的
        mergeField(key)
    }
    for (let key in child) { // 循环新的
        if (!parent.hasOwnProperty(key)) {
            mergeField(key)
        }
    }
    function mergeField(key) {
        // 策略模式，用策略模式减少if，else
        if (strats[key]) {
            options[key] = strats[key](parent[key], child[key])
        } else {
            // 如果不在策略中则以儿子为主
            options[key] = child[key] || parent[key] //优先采用儿子，再采用父亲
        }
    }
    return options
}