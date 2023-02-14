const db = require('../db')
const qs = require('qs')
//请求轮播图数据
exports.swiper = (req, res) => {
    const sqlselect = 'select * from leyou_swiper'
    db.query(sqlselect, (err, result) => {
        if (err) return res.cc('数据请求失败')
        res.send({
            status: 0,
            message: '数据请求成功!',
            data: result
        })
    })
}
//请求武侯景区数据
exports.spot = (req, res) => {
    const sqlselect = 'select * from leyou_scenic_spot where cover_id = ?'
    db.query(sqlselect, req.params.id, (err, result) => {
        if (err) return res.cc('数据请求失败')
        if (result.length === 0) return res.cc('未找到对应数据')
        res.send({
            status: 0,
            message: '数据请求成功!',
            data: result
        })
    })
}
//请求武侯所有数据
exports.search = (req, res) => {
    const sqlselect = 'select * from leyou_scenic_spot'
    db.query(sqlselect, req.params.id, (err, result) => {
        if (err) return res.cc('数据请求失败')
        if (result.length === 0) return res.cc('未找到对应数据')
        res.send({
            status: 0,
            message: '数据请求成功!',
            data: result
        })
    })
}
//请求路线数据以及景区数据
exports.travelrouter = (req, res) => {
    const travelsql = 'select * from leyou_travel_router where spot_id = ?'
    const getroute = 'select * from leyou_spot_introduce where Id = ?'
    db.query(travelsql, req.params.id, (err, result1) => {
        if (err) return res.cc('数据请求失败')
        db.query(getroute, req.params.id, (err, result2) => {
            res.send({
                status: 0,
                message: '数据请求成功!',
                data: [result1, ...result2]
            })
        })
    })
}

//数据排序
exports.fication = (req, res) => {
    const sql = `select * from leyou_scenic_spot where cover_id = ? order by ${req.query.name} ${req.query.sort}`
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.cc(err)
        if (result.length === 0) return res.cc('未找到对应数据')
        res.send({
            status: 0,
            message: '数据请求成功!',
            data: result
        })
    })
}
//请求有旅游线路推荐的景点
exports.introduce = (req, res) => {
    const sql = 'select * from leyou_spot_introduce'
    db.query(sql, (err, result) => {
        if (err) return res.cc(err)
        if (result.length === 0) return res.cc('未找到对应数据')
        res.send({
            status: 0,
            message: '数据请求成功!',
            data: result
        })
    })
}

//请求景点详细数据
exports.allstate = (req, res) => {
    const sql = 'select * from leyou_scenic_spot where id = ?'
    const sqlcomment = 'select * from leyou_comment where spot_id = ?'
    const sqlsrc = 'select * from leyou_tabel_spot where spot_id = ?'
    db.query(sql, req.params.id, (err, result1) => {
        if (err) return res.cc(err)
        if (result1.length === 0) return res.cc('未找到对应数据')
        //请求用户评论信息
        db.query(sqlcomment, req.params.id, (err, result2) => {
            if (err) return res.cc(err)
            // if (result2.length === 0) return res.cc('未找到对应数据')
            db.query(sqlsrc, req.params.id, (err, result3) => {
                if (err) return res.cc(err)
                // if (result3.length === 0) return res.cc('未找到对应数据')
                res.send({
                    status: 0,
                    message: '数据请求成功!',
                    data: [...result1, [...result2], [...result3]]
                })
            })
        })
    })
}
//查看用户关注景区
exports.follow = (req, res) => {
    let { id } = req.body
    let select = 'select * from leyou_follow where user_id = ?'
    db.query(select, id, (err, result) => {
        if (err) return res.cc(err)
        if (result.length === 0) {
            res.send({
                status: 0,
                message: '数据请求成功!',
                data: []
            })
        } else {
            res.send({
                status: 0,
                message: '数据请求成功!',
                data: result[0].user_check
            })
        }
    })
}

//设置取消添加景区
exports.ischeck = (req, res) => {
    let { id, post_id } = req.body
    let select = 'select * from leyou_follow where user_id = ?'
    let setpostid = 'update leyou_follow set user_check = ? where user_id = ?'
    db.query(select, id, (err, result) => {
        if (err) return res.cc(err)
        let user_checkarr = result[0].user_check.split(',')
        let index = user_checkarr.indexOf(post_id)
        if (index >= 0) {
            user_checkarr.splice(index, 1)
        } else {
            user_checkarr.push(post_id)
        }
        let newmessage = user_checkarr.join(',')
        db.query(setpostid, [newmessage, id], (err, result) => {
            if (err) return res.cc(err)
            if (result.affectedRows !== 1) return res.cc(result)
            res.send({
                status: 0,
                message: '信息修改成功'
            })
        })
    })
}
//用户发表评论
exports.usercomment = (req, res) => {
    //获取用户数据及评论信息
    const { username, usertext, spot_id, user_id, comment_time } = req.query
    // console.log(username, usertext, spot_id, user_id, comment_time)
    //定义插入代码
    let setsql = 'insert into leyou_comment set ?';
    let user = { username, usertext, spot_id, user_id, comment_time };
    //将数据插入数据库
    db.query(setsql, user, (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc(result)
        res.send({
            status: 0,
            message: '发表评论成功'
        })
    })
}

//查询用户浏览历史
exports.userfoot = (req, res) => {
    const { user_id } = req.body
    const select = 'select * from leyou_foot where user_id = ?'
    db.query(select, user_id, (err, result) => {
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc(result)
        //返回用户浏览历史
        res.send({
            status: 0,
            data: result[0].user_foot.split(',')
        })
    })
}
//添加用户浏览历史
exports.addfoot = (req, res) => {
    const { user_id, user_foot } = req.body
    const search = 'select * from leyou_foot where user_id = ?'
    const adduser = 'insert into leyou_foot set ?'
    const add = 'update leyou_foot set user_foot = ? where user_id = ?'
    const user = { user_id, user_foot }
    db.query(search, user_id, (err, result) => {
        if (err) return res.cc(err)
        //没有用户记录直接创建
        if (result.length === 0) {
            db.query(adduser, user, (err, result) => {
                if (err) return res.cc(err)
                if (result.affectedRows !== 1) {
                    return res.cc('添加失败')
                }
                res.send({
                    status: 0,
                    message: '添加用户浏览历史成功'
                })
            })
        } else {
            //有用户记录修改
            if (!result[0].user_foot.includes(user_foot)) {
                let data = user_foot + ',' + result[0].user_foot
                db.query(add, [data, user_id], (err, result) => {
                    if (err) return res.cc(err)
                    if (result.affectedRows !== 1) return res.cc(result)
                    res.send({
                        status: 0,
                        data: '修改成功'
                    })
                })
            } else {
                let newarr = result[0].user_foot.split(',')
                newarr.splice(newarr.indexOf(user_foot), 1)
                newarr.unshift(user_foot)
                let str = newarr.join(',')
                db.query(add, [str, user_id], (err, result) => {
                    if (err) return res.cc(err)
                    if (result.affectedRows !== 1) return res.cc(result)
                    res.send({
                        status: 0,
                        data: '修改成功'
                    })
                })
            }
        }
    })
}
//获取所有用户头像
exports.portrait = (req, res) => {
    const select = 'select * from leyou_portrait'
    db.query(select, (err, result) => {
        if (err) return res.cc(err)
        if (result.length === 0) return res.cc('未找到对应数据')
        res.send({
            status: 0,
            message: '数据请求成功!',
            data: result
        })
    })
}
//获取用户上传头像
exports.uploader = (req, res) => {
    console.log('被请求了', req.file, req.body, req.query)
}

//获取所有景区图片
exports.allpostimg = (req, res) => {
    const select = 'select * from leyou_tabel_spot'
    db.query(select, (err, result) => {
        if (err) return res.cc(err)
        if (result.length === 0) return res.cc('未找到对应数据')
        res.send({
            status: 0,
            message: '数据请求成功!',
            data: result
        })
    })
}
//修改用户关注景区
exports.changeCheck = (req, res) => {
    const change = 'update leyou_front_user set user_check = ? where appid = ?'
    const { user_check, appid } = req.body
    db.query(change, [user_check, appid], (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc(result)
        res.send({
            status: 0,
            message: '操作成功'
        })
    })
}

//修改景区收藏人数
exports.changeCollection = (req, res) => {
    const getCollectionNumber = 'select like_count from leyou_scenic_spot where id = ? '
    const updateNumber = 'update leyou_scenic_spot set like_count = ? where id = ?'
    const { id, checknumber } = req.body
    db.query(getCollectionNumber, id, (err, result) => {
        if (err) return res.cc(err)
        if (result.length === 0) return res.cc('未找到对应数据')
        let number
        if (checknumber >= 0) {
            //取消收藏
            number = Number(result[0].like_count - 1)
        } else {
            number = Number(result[0].like_count + 1)
        }
        db.query(updateNumber, [number, id], (err, result) => {
            if (err) return res.cc(err)
            if (result.affectedRows !== 1) return res.cc(result)
            res.send({
                status: 0,
                message: '操作成功'
            })
        })
    })
}

//插入照片接口
exports.addimg = (req, res) => {
    if (req.body.post_id) {
        let data = req.files.map(item => {
            return [req.body.post_id, `http://127.0.0.1:8080/public/uploads/${item.filename}`]
        })
        const Insertmysql = 'insert into leyou_tabel_spot(spot_id,imgsrc) VALUES ?'
        const sqlsrc = 'select * from leyou_tabel_spot where spot_id = ?'
        db.query(Insertmysql, [data], (err, result) => {
            if (err) return res.cc(err)
            db.query(sqlsrc, req.body.post_id, (err, result2) => {
                if (err) return res.cc(err)
                res.send({
                    status: 0,
                    data: result2
                })
            })
        })
    } else {
        res.send({
            status: 0,
            data: `http://127.0.0.1:8080/public/uploads/${req.files[0].filename}`
        })
    }
}

//删除用户评论接口
exports.deleteComment = (req, res) => {
    const deleteUserComment = 'delete from leyou_comment where id = ?'
    db.query(deleteUserComment, req.params.id, (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('未找到对应数据')
        res.send({
            status: 0,
            data: '删除成功'
        })
    })
}
//删除图片地址接口
exports.deleteImgSpot = (req, res) => {
    const deleteImgoperation = 'delete from leyou_tabel_spot where id = ?'
    db.query(deleteImgoperation, req.params.id, (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('未找到对应数据')
        res.send({
            status: 0,
            data: '删除成功'
        })
    })
}
//修改景区信息
exports.changeSpotInfo = (req, res) => {
    const updateSpotInfo = `update leyou_scenic_spot set ? where id = ${req.body.id}`
    db.query(updateSpotInfo, req.body, (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('未找到对应数据')
        res.send({
            status: 0,
            data: '更新成功'
        })
    })
}

//添加景区
exports.addscenicSpotInfo = (req, res) => {
    const addInfo = `insert into leyou_scenic_spot set ? `
    db.query(addInfo, req.body, (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('未找到对应数据')
        res.send({
            status: 0,
            data: result.insertId
        })
    })
}

//添加旅游线路
exports.addRoute = (req, res) => {
    let data = qs.parse(req.body)
    let arr = []
    for (let i in data) {
        let middle = []
        for (let j in data[i]) {
            middle.push(data[i][j])
        }
        arr.push(middle)
    }
    const addroute = `insert into leyou_travel_router(spot_id,origin,destination) VALUES ?`
    db.query(addroute, [arr], (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            data: '添加成功'
        })
    })
}

//删除旅游线路
exports.deleteRoute = (req, res) => {
    const deleteRoute = 'delete from leyou_travel_router where id = ?'
    db.query(deleteRoute, req.params.id, (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            data: '删除成功'
        })
    })
}

// 修改拥有推荐线路的景区详情
exports.updateRouteSpotInfo = (req, res) => {
    const updateInfo = `update leyou_spot_introduce set ? where Id = ${req.body.Id}`
    db.query(updateInfo, req.body, (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            data: '更新成功'
        })
    })
}

// 管理元上传拥有旅游线路的景区
exports.adminUploadSpotInfo = (req, res) => {
    const insertInfo = 'insert into leyou_spot_introduce set ?'
    db.query(insertInfo, req.body, (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            data: '上传成功!'
        })
    })
}
// 获取所有用户评论
exports.getAllUserComment = (req, res) => {
    const selectInfo = 'select * from leyou_comment'
    db.query(selectInfo, (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            data: result
        })
    })
}