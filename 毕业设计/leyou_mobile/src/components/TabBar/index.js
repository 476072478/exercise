import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './index.css'
import { TabBar } from 'antd-mobile'
import {
    AppOutline,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'
const tabs = [
    {
        key: '/home/首页',
        title: '首页',
        icon: <AppOutline />,
    },
    {
        key: '/list/线路推荐',
        title: '线路推荐',
        icon: <UnorderedListOutline />,
    },
    {
        key: '/my/我的',
        title: '我的',
        icon: <UserOutline />,
    },
]
export default function Tab() {
    const navigate = useNavigate()
    const location = useLocation()
    function changeRoute(key) {
        let arr = key.split('/')
        navigate(`/${arr[1]}`, { state: { name: arr[2] } })
    }
    return (
        <div className='componenttabbar'>
            <TabBar onChange={(key) => { changeRoute(key) }} activeKey={location.state === null ? "/home/首页" : location.pathname + '/' + location.state.name}>
                {tabs.map(item => {
                    return <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                })}
            </TabBar>
        </div>
    )
}
