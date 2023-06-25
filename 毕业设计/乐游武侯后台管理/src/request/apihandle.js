import instance from './api.js'
//请求所有景区数据
const getallspotdata = () => instance.get('/search')
//请求准确景区数据
const getspotDetail = (id) => instance.get('/allstate/' + id)
//删除用户评论
const deleteUserComment = (id) => instance.get('/deleteComment/' + id)
// 删除图片接口
const deleteImgSpot = (id) => instance.get('/deleteImgSpot/' + id)
//修改景区信息
const changeSpotInfo = (data) => instance({
    url: '/changeSpotInfo',
    method: 'POST',
    data
})
//获取拥有旅游线路的景区
const getSpotintroduce = () => instance.get('/introduce')
// 添加景区
const addscenicSpotInfo = (data) => instance({
    url: '/addscenicSpotInfo',
    method: 'POST',
    data
})
//添加线路
const addUserRoute = (data) => instance({
    url: '/addRoute',
    method: 'POST',
    data: data
})
// 请求路线数据
const gettravelrouter = (id) => instance.get('/travelrouter/' + id)
//删除旅游现象
const deleteRoute = (id) => instance.get('/deleteRoute/' + id)
// 修改拥有推荐线路的景区详情
const updateRouteSpotInfo = (data) => instance({
    url: '/updateRouteSpotInfo',
    method: 'POST',
    data: data
})
// 管理员上传拥有旅游线路的景区
const adminUploadSpotInfo = (data) => instance({
    url: '/adminUploadSpotInfo',
    method: 'POST',
    data: data
})
// 管理员登录
const adminLogin = (data) => instance({
    url: 'http://127.0.0.1:8080/my/adminlogin',
    method: 'POST',
    data: data
})
// 获取所有用户评论信息
const getAllUserComment = () => instance.get('/getAllUserComment')
export {
    getallspotdata,
    getspotDetail,
    deleteUserComment,
    deleteImgSpot,
    changeSpotInfo,
    addscenicSpotInfo,
    getSpotintroduce,
    gettravelrouter,
    addUserRoute,
    deleteRoute,
    updateRouteSpotInfo,
    adminUploadSpotInfo,
    adminLogin,
    getAllUserComment
}