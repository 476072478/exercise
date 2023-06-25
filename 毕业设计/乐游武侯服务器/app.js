const express = require('express')
const apiroute = require('./router/api')
const cors = require('cors')
const login = require('./router/login')
const app = express()
//导入解析token的包
const { expressjwt: jwt } = require("express-jwt")
const config = require('./config')
//接收req上的body
app.use(express.urlencoded({ extended: false }))
//判断用户的token
//配置跨域
app.use(cors())
//封装一个报错中间件
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})
// app.use(jwt({ secret: config.secretKey, algorithms: ["HS256"], }).unless({ path: [/[\/api||\/public||\/my]/] }))
app.use(jwt({ secret: config.secretKey, algorithms: ["HS256"], }).unless({ path: [/\/public||\/my/] }))
//配置静态文件
app.use('/public', express.static('./public'))
//注册my路由信息
app.use('/my', login)
//注册api路由信息
app.use('/api', apiroute)
app.listen(8080, () => {
    console.log('http://127.0.0.1:8080')
})