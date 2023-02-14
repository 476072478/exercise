const express = require('express')
const { userinfo, userinfopost, updatepwd, update, cates, addcates, deletecate, cate, updatecate } = require('../routerhandle/my_router')
const routers = express.Router()
//获取用户信息接口
routers.get('/userinfo', userinfo)
//修改用户信息接口
routers.post('/userinfo', userinfopost)
//修改密码接口
routers.post('/updatepwd', updatepwd)
//修改头像接口
routers.post('/update/avatar', update)
//查找文章分类接口
routers.get('/article/cates', cates)
//新增文章分类接口
routers.post('/article/addcates', addcates)
//根据ID删除文章分类接口
routers.get('/article/deletecate/:id', deletecate)
//根据ID获取文章分类接口
routers.get('/article/cate/:id', cate)
//根据ID更新文章分类接口
routers.post('/article/updatecate', updatecate)
module.exports = routers