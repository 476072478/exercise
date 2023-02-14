import Vue from 'vue'
import App from './App.vue'
import Mytabbar from '@/componenet/Mytabbar'
import Bjtp from '@/componenet/Bjtp'
Vue.component('MyTabbar',Mytabbar)
Vue.component('BjTp',Bjtp)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
