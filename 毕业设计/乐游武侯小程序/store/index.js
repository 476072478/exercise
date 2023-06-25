import Vue from 'vue'
import Vuex from 'vuex'
import {getIntroduce,postCheckintroduce} from '@/common/http.api.js';
Vue.use(Vuex)
const store = new Vuex.Store({
	state:{
		loginState:uni.getStorageSync('loginState') ? false : true,
		userInfo:uni.getStorageSync('userInfo') ? 
		JSON.parse(uni.getStorageSync('userInfo')) : {
			name:'未知用户',
			avatar:'/static/nopic.png',
			liked:0,
			commented:0,
			user_check:''
		},
		Introduce:[]
	},
	getters:{
		getUser_check(state){
			return state.userInfo.user_check && state.userInfo.user_check.split(',').map(item => Number(item)) || []
		},
		getIntroduce(state){
			return state.Introduce.sort((a,b)=>{
				return a.price - b.price
			})
		},
	},
	mutations:{
		//用户登录操作
		USERLOGIN(state,userInfo){
			state.loginState = false
			state.userInfo = userInfo
			uni.setStorageSync('loginState','ok')
			uni.setStorageSync('userInfo',JSON.stringify(userInfo))	
		},
		//用户退出操作			
		USEROUT(state){
			state.loginState = true
			state.userInfo = {
				name:'未知用户',
				avatar:'/static/nopic.png',
				liked:0,
				commented:0
			}
			uni.removeStorageSync('loginState')
			uni.removeStorageSync('userInfo')
		},
		GETINTRODUCEINFO(state,data){
			state.Introduce = data
		},
		// 修改用户收藏数据
		CHANGEUSERCHECK(state,data){
			state.userInfo.user_check = data
			uni.setStorageSync('userInfo',JSON.stringify(state.userInfo))
		},
		//修改景区收藏总数
		CHANGELIKE_COUNT(state,data){
			const {item,checknumber} = data
			if(checknumber >=0){
				state.Introduce = state.Introduce.map(data=>{
					if(data.id === item.id){
						let newdata = data
						newdata.like_count --
						return newdata
					}
					return data
				})
			}else{
				state.Introduce = state.Introduce.map(data=>{
					if(data.id === item.id){
						let newdata = data
						newdata.like_count ++
						return newdata
					}
					return data
				})
			}
		}
	},
	actions:{
		//用户登录操作
		userlogin(context,data){
			context.commit('USERLOGIN',data)
		},
		//用户退出操作
		userout(context){
			context.commit('USEROUT') 
		},
		//获取所有景区信息
		getIntroduceInfo(context){
			let data
			getIntroduce().then(res=>{
				data = res.data
				context.commit('GETINTRODUCEINFO',data)
			})
		},
		// 修改用户收藏数据
		changeCheck(context,user_check){
			context.commit('CHANGEUSERCHECK',user_check)
		},
	}
})
export default store

