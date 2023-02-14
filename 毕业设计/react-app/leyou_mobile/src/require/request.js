//统一管理发送请求
import requests from './index'
import qs from 'qs'
//请求轮播图数据
export const requestSwiper = () => {
    return (dispatch) => {
        requests.get("/api/swiper").then(res => {
            dispatch({
                type: "requestSwiper",
                data: res.data.data
            })
        })
    }
}
//请求旅游景点数据
export const requestPost = (id) => {
    return (dispatch) => {
        requests.get(`/api/spot/${id}`).then(res => dispatch({
            type: "requestPost",
            data: res.data.data
        }))
    }
}
//请求搜素数据
export const requestSearch = () => {
    return (dispatch) => {
        requests.get(`/api/search`).then(res => dispatch({
            type: "requestPost",
            data: res.data.data
        }))
    }
}
//请求旅游线路数据
export const requestTraverRouter = (id) => {
    return (dispatch) => {
        requests.get(`/api/travelrouter/${id}`).then(res => dispatch({
            type: "requestTraverRouter",
            data: res.data.data
        }))
    }
}
//数据顺序
export const requestSortList = (name = 'price', sort = 'ASC', id = 0) => {
    return (dispatch) => {
        requests({
            url: `/api/spot/${id}`,
            params: {
                name,
                sort
            },
            method: 'post'
        }).then(res => dispatch({
            type: "requestPost",
            data: res.data.data
        }))
    }
}
//请求拥有旅游线路推荐景点的数据
export const requestIntroduce = () => {
    return (dispatch) => {
        requests({
            url: `/api/introduce`,
            method: 'get'
        }).then(res => dispatch({
            type: "requestIntroduce",
            data: res.data.data
        }))
    }
}

//发送注册信息
export const requestRegUser = (username, password, nickname, email) => {
    return requests({
        url: "/my/register",
        method: "POST",
        params: {
            username,
            password,
            nickname,
            email
        }
    }).then(res => {
        if (res.data.status === 0) {
            alert('恭喜你，注册成功！')
        }
        if (res.data.status === 1) {
            alert('抱歉，此用户名已被使用')
            return new Promise((resolve, reject) => {
                reject('抱歉，此用户名已被使用')
            })
        }
    })
}
//发送登录信息
export const requestLogin = (username, password) => {
    return requests({
        url: '/my/login',
        method: "POST",
        data: qs.stringify({
            username,
            password
        })
    })
}
//请求具体景区信息
export const requestTabel = (id) => {
    return (dispatch) => {
        requests({
            url: '/api/allstate/' + id,
            method: 'GET'
        }).then(res => {
            if (res.data.status === 0) {
                dispatch({
                    type: "requestTabel",
                    data: res.data.data
                })
            }
        })
    }
}

//请求用户关注信息
export const requestFollow = () => {
    let id = JSON.parse(localStorage.getItem('tokenleyou')).id
    return (dispatch) => {
        requests({
            url: '/api/follow',
            method: 'POST',
            data: qs.stringify({
                id
            })
        })
        // .then(res => {
        //     if (res.data.status === 0) {
        //         let follow
        //         if (res.data.data.length !== 0) follow = res.data.data.split(',')
        //         dispatch({
        //             type: "requestFollow",
        //             data: follow
        //         })
        //     }
        // })
    }
}

//修改用户关注信息
export const requestischeck = (post_id) => {
    let id = JSON.parse(localStorage.getItem('tokenleyou')).id
    return requests({
        url: "/api/ischeck",
        method: 'POST',
        data: qs.stringify({
            id,
            post_id
        })
    })
}
//发送用户评论信息
export const requestsUserComment = (username, usertext, spot_id, user_id) => {
    return requests({
        url: '/api/usercomment',
        method: 'POST',
        data: qs.stringify({
            username,
            usertext,
            spot_id,
            user_id
        })
    })
}

//发送历史记录
export const requestUserfoot = (user_id, user_foot) => {
    requests({
        url: "/api/addfoot",
        method: "POST",
        data: qs.stringify({
            user_id,
            user_foot
        })
    })
}

//查找历史记录
export const requestmyfoot = (user_id) => {
    return (dispatch) => {
        requests({
            url: "/api/userfoot",
            method: 'POST',
            data: qs.stringify({
                user_id
            })
        }).then(res => {
            dispatch({
                type: 'requestmyfoot',
                data: res.data.data
            })
        })
    }
}

//查询天气
export const requestetouch = (city) => {
    return requests({
        url: `http://wthrcdn.etouch.cn/weather_mini?city=${city}`,
        method: 'get'
    })
}

//查询用户头像
export const portrait = () => {
    return (dispatch) => {
        requests({
            url: '/api/portrait',
            method: 'get'
        }).then(res => {
            dispatch({
                type: 'portrait',
                data: res.data.data
            })
        })
    }
}
//上传用户头像
export const requesheader = (data) => {
    return requests({
        url: `/api/uploader`,
        method: 'post',
        data: data,
    })
}