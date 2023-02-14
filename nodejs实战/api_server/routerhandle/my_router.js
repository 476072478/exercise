const db = require('../db/index')
const bcrypt = require("bcryptjs")
exports.userinfo = (req, res) => {
    const sql = 'select id,username,nickname,email,user_pic from ev_users where id = ?'
    db.query(sql, req.user.id, (err, result) => {
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc('获取用户信息失败')
        res.send({
            status: 0,
            message: '获取用户信息成功',
            result
        })
    })
}
exports.userinfopost = (req, res) => {
    const { nickname, email } = req.body
    const change = 'update ev_users set ? where id = ?'
    db.query(change, [{ nickname, email }, req.user.id], (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '修改用户信息成功',
            result
        })
    })
}
//修改用户密码的操作
exports.updatepwd = (req, res) => {
    const { oldpassword, newpassword } = req.body
    const checkold = 'select * from ev_users where id = ?'
    const changestr = 'update ev_users set password = ? where id =?'
    //判断新密码与旧密码是否相同
    if (oldpassword === newpassword) return res.cc('新密码与旧密码不能相同')
    //查询该id对应的数据
    db.query(checkold, req.user.id, (err, result) => {
        if (err) return res.cc(err)
        //判断密码是否正确
        if (result.length !== 1) {
            return res.cc('该用户不存在')
        }
        const compareResult = bcrypt.compareSync(oldpassword, result[0].password)
        if (!compareResult) {
            return res.cc('输入密码与原密码不同')
        }
        //将新密码加密
        const prenewpassword = bcrypt.hashSync(newpassword, 10)
        //修改密码
        db.query(changestr, [prenewpassword, req.user.id], (err, result) => {
            if (err) return res.cc(err)
            if (result.affectedRows !== 1) return res.cc('修改失败')
            res.send({
                status: 0,
                message: '修改密码成功'
            })
        })
    })
}
exports.update = (req, res) => {
    res.send('ok')
}
//获取文章分类列表
exports.cates = (req, res) => {
    const select = 'select * from ev_article_cate where is_delete = 0 order by id'
    //发送给数据库请求
    db.query(select, (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取文章分类列表成功',
            data: result
        })
    })
}
//新增文章分类接口
exports.addcates = (req, res) => {
    const { name, alias } = req.body
    if (!name || !alias) return res.cc('name或alias不能为空')
    //判断分类名称和分类别名是否已经被占用
    const checksql = 'select * from ev_article_cate where name = ? || alias = ?'
    db.query(checksql, [name, alias], (err, result) => {
        if (err) return res.cc(err)
        if (result.length >= 1) {
            if (result[0].name === name) return res.cc('分类名称被占用')
            if (result[0].alias === alias) return res.cc('分类别名被占用')
        }
        const addsql = 'insert into ev_article_cate set ?'
        db.query(addsql, req.body, (err, result) => {
            if (err) return res.cc(err)
            if (result.affectedRows !== 1) return res.cc('增加文章分类失败')
            res.send({
                status: 0,
                message: '增加文章分类成功',
            })
        })
    })
}
//文章删除接口操作
exports.deletecate = (req, res) => {
    const { id } = req.params
    const deletestr = 'update ev_article_cate set is_delete = 1 where id = ?'
    db.query(deletestr, id, (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('删除失败')
        res.send('删除文章分类成功')
    })
}
//根据id获取文章数据操作
exports.cate = (req, res) => {
    const { id } = req.params
    const selectsql = 'select * from ev_article_cate where id = ?'
    db.query(selectsql, id, (err, result) => {
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc('获取数据失败')
        res.send({
            status: 0,
            message: '获取数据成功！',
            data: result[0]
        })
    })
}
//根据ID更新文章分类接口
exports.updatecate = (req, res) => {
    const { id, name, alias } = req.body
    if (!id || !name || !alias) return res.send('发送的参数不够 ')
    //根据ID查询文章
    const checksql = 'select * from ev_article_cate where name = ? || alias = ?'
    db.query(checksql, [name, alias], (err, result) => {
        if (err) return res.cc(err)
        if (result.length >= 1) {
            if (result[0].name === name) return res.cc('分类名称被占用')
            if (result[0].alias === alias) return res.cc('分类别名被占用')
        }
        const update = 'update ev_article_cate set ? where id = ? '
        db.query(update, [{ name, alias }, id], (err, result) => {
            if (err) return res.cc(err)
            if (result.affectedRows !== 1) return res.cc('更新文章分类失败')
            res.send('更新文章分类成功')
        })
    })
}