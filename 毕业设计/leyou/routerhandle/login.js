const db = require('../db/index')
//导入加密 密码的包
const bcrypt = require("bcryptjs")
//导入生成token的包
const jwt = require('jsonwebtoken');
//导入全局的配置文件
const config = require('../config');
const WXBizDataCrypt = require('../db/WXBizDataCrypt')
const request = require('request');
//注册新用户的处理函数
exports.regUser = (req, res) => {
    const { username, password, nickname, email } = req.query
    //判断用户是否输入用户名或密码
    if (!username || !password) {
        return res.cc('用户名或密码不能为空')
    }
    //查询用户名是否被占用
    const checkStr = `select * from leyou_front_user where username = ?`
    db.query(checkStr, username, (err, result) => {
        if (err) {
            return res.send(err.message)
        }
        if (result.length > 0) {
            return res.cc('该用户名被占用，请更换其他用户名')
        }
        //向数据库插入用户注册信息
        const ecppassword = bcrypt.hashSync(password, 10)
        const sqlStr = 'insert into leyou_front_user set ?'
        const user = { username, password: ecppassword, nickname, email }
        db.query(sqlStr, user, (err, result) => {
            //判断sql语句是否成功
            if (err) {
                return res.cc(err)
            }
            // 判断影响行数是否等于1
            if (result.affectedRows !== 1) {
                return res.cc('注册失败啦！')
            }
            if (result.affectedRows === 1) {
                res.send({
                    status: 0,
                    message: '注册成功啦！',
                    username,
                    nickname
                })
            }
        })
    })
}
//用户登录接口
exports.login = (req, res) => {
    let { username, password } = req.body
    let sql = 'select * from leyou.leyou_front_user where username = ? && status = 0'
    db.query(sql, username, (err, result) => {
        if (err) {
            return res.send(err.message)
        }
        if (result.length === 0) {
            return res.cc('用户名输入错误')
        }
        let judge = bcrypt.compareSync(password, result[0].password)
        if (!judge) return res.cc('密码输入错误')
        let newresult = { ...result[0], password: '' }
        const tokenstr = jwt.sign(newresult, config.secretKey, { expiresIn: '168h' })
        res.send({ ...newresult, token: 'Bearer' + ' ' + tokenstr })
    })
}
//管理员登录接口
exports.adminlogin = (req, res) => {
    let { name, pass } = req.body
    let sql = 'select * from administrators_news where adminname = ? && status = 0'
    db.query(sql, name, (err, result) => {
        if (err) {
            return res.send(err.message)
        }
        if (result.length === 0) {
            return res.cc('用户名输入错误')
        }
        let newresult = { ...result[0], adminpassword: '', status: "" }
        const tokenstr = jwt.sign(newresult, config.secretKey, { expiresIn: '168h' })
        res.send({ ...newresult, token: 'Bearer' + ' ' + tokenstr })
    })
}
//微信用户登录接口
exports.logins = (req, res) => {
    let appId = 'wx884b78952c3db4a4'
    let appSecret = '4719590b9411233a0c8a4c7694e60058'
    let reqs = req.body
    request('https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + appSecret + '&js_code=' + reqs.code + '&grant_type=authorization_code', (error, response, body) => {
        if (!error && response.statusCode === 200) {	//通过前端传过来的code获取sessionKey
            let bodyJson = JSON.parse(body)
            var sessionKey = bodyJson.session_key;
            var encryptedData = reqs.encryptedData.replace(/ /g, '+')	//要把空格替换成+，不然会报错，因为前端数据传到后端时+号会被解析成空格，要再换回去
            var iv = reqs.iv.replace(/ /g, '+')
            var pc = new WXBizDataCrypt(appId, sessionKey)
            var data = pc.decryptData(encryptedData, iv)
            const { avatarUrl, watermark: { timestamp, appid } } = data
            let sql = `select * from leyou.leyou_front_user where openId = '${data.openId}' && status = 0`
            let add = `insert into leyou_front_user set ?`
            const user = { username: data.nickName, password: '', nickname: data.nickName, email: '', openId: data.openId, avatarUrl: avatarUrl, timestamp: timestamp, appid: appid }
            function mylogins() {
                db.query(sql, (err, result) => {
                    if (err) {
                        return res.send(err.message)
                    }
                    if (!result[0]) {
                        db.query(add, user, (err, result) => {
                            if (err) {
                                return res.send(err.message)
                            }
                            if (result) {
                                mylogins()
                            }
                        })
                    }
                    if (result[0]) {
                        res.send({
                            status: 0,
                            message: '登录成功啦！',
                            data: result[0]
                        })
                    }
                })
            }
            mylogins()
        }
    })
}