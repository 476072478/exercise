//对axios进行二次封装
import axios from 'axios'
import { Toast } from 'antd-mobile'
//利用axios对象的create方法创建axios实例
const requests = axios.create({
    //路径添加
    baseURL: 'http://127.0.0.1:8080',
    //请求超时时间
    timeout: 5000,
});
//请求拦截器
requests.interceptors.request.use((config) => {
    //config配置对象，可以发送请求头
    Toast.show({
        icon: 'loading',
        content: '加载中…',
    })
    return config
})

requests.interceptors.response.use((response) => {
    //成功的回调函数
    Toast.clear()
    Toast.show({
        content: '加载成功',
        duration: 1000
    })
    return response
}, (error) => {
    //失败的回调函数
    // return Promise.reject(new Error('faile'))
})
export default requests