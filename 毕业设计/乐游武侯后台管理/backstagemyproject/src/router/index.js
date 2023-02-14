import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/home.vue'
import Administerspot from '../views/administerspot/administerspot.vue'
import SpotDetail from '../views/spotdetail/spotdetail.vue'
import Addscenicspot from '@/views/addscenicspot/addscenicspot.vue'
import Routeradminister from '@/views/routeradminister/routeradminister.vue'
import RouterDetail from '@/views/routerDetail/routerdetail.vue'
import AddRouteSpot from '@/views/addRouteSpot/addroutespot.vue'
import Login from '@/views/login/login.vue'
import Homeeachrs from '@/views/homeeachrs/homeeachrs.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: localStorage.getItem('admintoken') ? '/home/homeeachrs' : '/login',
  },
  {
    path: '/home',
    name: '/home',
    component: Home,
    meta: { name: '首页' },
    children: [
      {
        path: '/home/homeeachrs',
        name: '/home/homeeachrs',
        component: Homeeachrs,
        meta: { name: '首页' }
      },
      {
        path: '/home/administerspot',
        name: '/home/administerspot',
        component: Administerspot,
        meta: { name: '管理景区' }
      },
      {
        path: '/home/spotdetail/:id',
        name: '/home/spotdetail',
        component: SpotDetail,
        meta: { name: '景区详情' }
      },
      {
        path: '/home/addscenicspot',
        name: '/home/addscenicspot',
        component: Addscenicspot,
        meta: { name: '添加景区' }
      },
      {
        path: '/home/routeradminister',
        name: '/home/routeradminister',
        component: Routeradminister,
        meta: { name: '线路管理' }
      },
      {
        path: '/home/routerdetail/:id',
        name: '/home/routerdetail',
        component: RouterDetail,
        meta: { name: '线路详情' }
      },
      {
        path: '/home/addroutespot',
        name: '/home/addroutespot',
        component: AddRouteSpot,
        meta: { name: '添加线路' }
      },
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
export default router
