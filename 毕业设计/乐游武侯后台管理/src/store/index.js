import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adminInfo: localStorage.getItem("adminInfo") ? JSON.parse(localStorage.getItem("adminInfo")) : {}
  },
  mutations: {
    SETADMININFO(state, data) {
      state.adminInfo = data
    },
    DELETEADMININFO(state) {
      state.adminInfo = {}
    }
  },
  actions: {
    // 保存管理员信息
    setadmininfo(context, data) {
      localStorage.setItem('admintoken', data.token)
      localStorage.setItem('adminInfo', JSON.stringify(data))
      context.commit('SETADMININFO', data)
    },
    // 删除管理员信息
    deleteadmininfo(context) {
      localStorage.removeItem('admintoken')
      localStorage.removeItem('adminInfo')
      context.commit('DELETEADMININFO')
    }
  },
  modules: {
  }
})
