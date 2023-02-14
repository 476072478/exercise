import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../../views/home/Home'
import UserList from '../../views/userList/UserList'
import Rolelist from '../../views/rolelist/Rolelist'
import Rightlist from '../../views/rightlist/Rightlist'
import NoPermission from '../../views/noPermission/NoPermission'
import NewsAdd from '../../views/news-manage/NewsAdd'
import NewsDraft from '../../views/news-manage/NewsDraft'
import NewsPreview from '../../views/news-manage/NewsPreview'
import NewsCateGory from '../../views/news-manage/NewsCateGory'
import NewsUpdate from '../../views/news-manage/NewsUpdate'
import Audit from '../../views/audit-manage/Audit'
import AuditList from '../../views/audit-manage/AuditList'
import Unpublished from '../../views/publish-manage/Unpublished'
import Published from '../../views/publish-manage/Published'
import Sunset from '../../views/publish-manage/Sunset'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import axios from 'axios'
function NewsRouter(props) {
    const [backRouteList, setBackRouteList] = useState([])
    const users = JSON.parse(localStorage.getItem('token'))
    const { role: { rights } } = users
    useEffect(() => {
        Promise.all([
            axios.get('/rights'),
            axios.get('/children')
        ]).then(res => {
            setBackRouteList(([...res[0].data, ...res[1].data]))
        })
    }, [])
    const checkRouter = (item) => {
        return LocalRouterMap[item.key] && (item.pagepermisson === 1 || item.routepermisson === 1)
    }
    const checkUserPermisson = (item) => {
        return rights.includes(item.key)
    }
    const LocalRouterMap = {
        '/home': <Home />,
        '/user-manage/list': <UserList />,
        '/right-manage/role/list': <Rolelist />,
        '/right-manage/right/list': <Rightlist />,
        '/news-manage/add': <NewsAdd />,
        '/news-manage/draft': <NewsDraft />,
        '/news-manage/category': <NewsCateGory />,
        '/news-manage/preview/:id': <NewsPreview />,
        '/news-manage/update/:id': <NewsUpdate />,
        '/audit-manage/audit': <Audit />,
        '/audit-manage/list': <AuditList />,
        '/publish-manage/unpublished': <Unpublished />,
        '/publish-manage/published': <Published />,
        '/publish-manage/sunset': <Sunset />,
    }
    return (
        <Spin size='large' spinning={props.Spinning}>
            <Routes>
                <Route path='/' element={<Navigate to='/home' />} />
                {backRouteList.length > 0 && <Route path='*' element={<NoPermission />} />}
                {backRouteList && backRouteList.map(item => {
                    if (checkRouter(item) && checkUserPermisson(item)) {
                        return <Route key={item.key} path={item.key} element={LocalRouterMap[item.key]}></Route>
                    } else {
                        return null
                    }
                })}
            </Routes >
        </Spin>
    )
}
const mapStateutil = (state) => {
    return {
        Spinning: state.utilReducer.Spinning
    }
}
export default connect(mapStateutil)(NewsRouter)