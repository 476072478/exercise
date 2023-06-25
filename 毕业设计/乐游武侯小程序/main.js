import App from './App'
//引入 uView UI 插件仓库
import uView from 'uview-ui'
Vue.use(uView)
//引入 login 组件
import login from '@/components/login/login.vue'
Vue.use(login)
//引入公用组件 uni-nav-bar
import uniNavBar from '@/components/uniNavBar.vue'
Vue.component('uni-nav-bar',uniNavBar)
// #ifndef VUE3
import Vue from 'vue'
import store from '@/store/index.js'
Vue.prototype.$store = store
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif
require('@/common/http.intercept.js')(app)
// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif