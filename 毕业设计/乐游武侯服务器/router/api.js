const express = require('express')
const apiroute = express.Router()
const handles = require('../routerhandle/apihandle')


//引入处理图片的中间件
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage })


const { swiper, spot, search, travelrouter, fication, introduce, allstate, follow, ischeck, usercomment, userfoot, addfoot, portrait, uploader, allpostimg, changeCheck, changeCollection, addimg, deleteComment, deleteImgSpot, changeSpotInfo, addscenicSpotInfo, addRoute, deleteRoute, updateRouteSpotInfo, adminUploadSpotInfo, getAllUserComment } = handles
//配置轮播图数据接口
apiroute.get('/swiper', swiper)
//配置武侯景区数据接口
apiroute.get('/spot/:id', spot)
//获取搜索数据
apiroute.get('/search', search)
//请求路线数据
apiroute.get('/travelrouter/:id', travelrouter)
//数据排序
apiroute.post('/spot/:id', fication)
//请求有旅游线路推荐的景点
apiroute.get('/introduce', introduce)
//请求景点详细数据
apiroute.get('/allstate/:id', allstate)
//查看用户关注景区
apiroute.post('/follow', follow)
//设置取消添加景区
apiroute.post('/ischeck', ischeck)
//发送用户评论信息
apiroute.post('/usercomment', usercomment)
//用户浏览历史
apiroute.post('/userfoot', userfoot)
//添加浏览历史
apiroute.post('/addfoot', addfoot)
//获取所有用户头像
apiroute.get('/portrait', portrait)
//获取用户上传头像
apiroute.post('/uploader', uploader)
//获取所有景区图片
apiroute.get('/allpostimg', allpostimg)
//修改用户关注景区
apiroute.post('/changeCheck', changeCheck)
//修改景区收藏人数
apiroute.post('/changeCollection', changeCollection)
//上传景区图片
apiroute.post('/addimg', upload.array('avatar', 10), addimg)
//删除用户评论接口
apiroute.get('/deleteComment/:id', deleteComment)
//删除图片接口
apiroute.get('/deleteImgSpot/:id', deleteImgSpot)
//修改景区信息
apiroute.post('/changeSpotInfo', changeSpotInfo)
// 添加景区
apiroute.post('/addscenicSpotInfo', addscenicSpotInfo)
//添加旅游线路
apiroute.post('/addRoute', addRoute)
//删除旅游线路
apiroute.get('/deleteRoute/:id', deleteRoute)
// 修改拥有推荐线路的景区详情
apiroute.post('/updateRouteSpotInfo', updateRouteSpotInfo)
// 管理员上传拥有旅游线路的景区
apiroute.post('/adminUploadSpotInfo', adminUploadSpotInfo)
// 获取所有用户评论
apiroute.get('/getAllUserComment', getAllUserComment)
module.exports = apiroute