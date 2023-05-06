import { compileToFunction } from "./compiler";
import { initMixin } from "./init";
import { lifeCycleMixin } from "./lifecycle";
import { initStateMixin } from "./state";
import { createElm, patch } from "./vdom/patch";
function Vue(options) {
    this._init(options);
}
initStateMixin(Vue)
initMixin(Vue); // 扩展了init方法
lifeCycleMixin(Vue);
export default Vue;
let render1 = compileToFunction(`
    <ul a='1' style='background:yellow'>
        <li key='a'>a</li>
        <li key='b'>b</li>
        <li key='c'>c</li>
        <li key='d'>d</li> 
    </ul>`
)
let vm1 = new Vue({ data: { name: 'zf' } })
let prevVnode = render1.call(vm1)
let el = createElm(prevVnode)
document.body.appendChild(el)
let render2 = compileToFunction(`
    <ul a='1' style='background:red;list-style: none;'>
        <li key='d'>d</li> 
        <li key='a'>a</li>
        <li key='b'>b</li>
        <li key='c'>c</li>
    </ul>`
)
let vm2 = new Vue({ data: { name: '1111' } })
let nextNode = render2.call(vm2)
setTimeout(() => {
    patch(prevVnode, nextNode)
}, 1000);