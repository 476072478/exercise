/*
 * @Author: 小唐 476072478@qq.com
 * @Date: 2023-03-03 09:34:32
 * @LastEditors: 小唐 476072478@qq.com
 * @LastEditTime: 2023-04-18 16:38:05
 * @FilePath: \Vue2源码编写\src\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { initMixin } from "./init";
import { lifeCycleMixin } from "./lifecycle";
import { initStateMixin } from "./state";
function Vue(options) {
    this._init(options);
}
initStateMixin(Vue)
initMixin(Vue); //扩展了init方法
lifeCycleMixin(Vue);
export default Vue;

