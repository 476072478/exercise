const express = require('express')
const cors = require('cors')
const routers = require('./router/api_router')
const myrouters = require('./router/my_router')
//导入解析token的包
const expressJWT = require("express-jwt")
const config = require('./config')
const app = express()
//配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))
//解决跨域问题
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
//验证token密钥
app.use(expressJWT({ secret: config.secretKey }).unless({ path: [/^\/api\//] }))
//配置失败的回调
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.cc('身份认证失败')
    }
})
//注册路由
app.use('/api', routers)
app.use('/my', myrouters)
//项目启动
app.listen(3007, () => {
    console.log('http://127.0.0.1:3007')
})