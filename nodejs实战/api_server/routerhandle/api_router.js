const db = require('../db/index')
//导入加密 密码的包
const bcrypt = require("bcryptjs")
//导入生成token的包
const jwt = require('jsonwebtoken');
//导入全局的配置文件
const config = require('../config')
//注册新用户的处理函数
exports.regUser = (req, res) => {
    const { username, password, nickname, email } = req.body
    //判断用户是否输入用户名或密码
    if (!username || !password) {
        return res.cc('用户名或密码不能为空')
    }
    //查询用户名是否被占用
    const checkStr = `select * from ev_users where username = ?`
    db.query(checkStr, username, (err, result) => {
        if (err) {
            return res.send(err.message)
        }
        if (result.length > 0) {
            return res.cc('该用户名被占用，请更换其他用户名')
        }
    })
    //向数据库插入用户注册信息
    const ecppassword = bcrypt.hashSync(password, 10)
    const sqlStr = 'insert into ev_users set ?'
    const user = { username, password: ecppassword, nickname, email }
    db.query(sqlStr, user, (err, result) => {
        //判断sql语句是否成功
        if (err) {
            return res.cc(err)
        }
        //判断影响行数是否等于1
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
}
//登录的处理函数
exports.login = (req, res) => {
    const { username, password } = req.body
    //判断用户名或密码是否为空
    if (!username || !password) {
        return res.cc('用户名或密码不能为空')
    }
    //判断用户名是否存在
    const sql = `select * from ev_users where username = ?`
    db.query(sql, username, (err, result) => {
        //执行sql语句失败
        if (err) return res.cc(err)
        //执行sql语句成功
        if (result.length !== 1) return res.cc('登录失败')
        //判断密码是否正确
        const compareResult = bcrypt.compareSync(password, result[0].password)
        if (!compareResult) return res.cc('登录失败')
        //清空用户的密码和头像信息
        const user = { ...result[0], password: '', user_pic: '' }
        //生成token字符串
        const tokenstr = jwt.sign(user, config.secretKey, { expiresIn: '2h' })
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer' + ' ' + tokenstr
        })
    })
}