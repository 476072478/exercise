import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom'
import { connect } from "react-redux";
import axios from 'axios'
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
function SideMenu(props) {
    const { Sider } = Layout;
    const navigate = useNavigate()
    const [meun, setmeun] = useState([])
    const location = useLocation()
    const { pathname } = location
    const users = JSON.parse(localStorage.getItem('token'))
    const { role: { rights } } = users
    useEffect(() => {
        axios.get('/rights?_embed=children').then(res => { setmeun(setlist(res)) })
    }, [])
    function changeRouter(e) {
        navigate(e.key)
    }
    const iconList = {
        "/home": <AppstoreOutlined />,
        "/right-manage": <AppstoreOutlined />,
        "/user-manage": <ContainerOutlined />,
        "/news-manage": <ContainerOutlined />,
        "/audit-manage": <ContainerOutlined />,
        "/publish-manage": <ContainerOutlined />,
        "/user-manage/list": <ContainerOutlined />,
        "/right-manage/role/list": <DesktopOutlined />,
        "/right-manage/right/list": <MailOutlined />,
        "/news-manage/add": <MenuFoldOutlined />,
        "/news-manage/draft": <MenuUnfoldOutlined />,
        "/news-manage/category": <PieChartOutlined />
    }
    function setlist(res) {
        let newlist = res.data
        newlist = newlist.map(item => {
            if (item.pagepermisson && item.pagepermisson === 1 && rights.includes(item.key)) {
                let newobject = {}
                for (let i in item) {
                    newobject.id = item.id
                    newobject.label = item.title
                    newobject.key = item.key
                    if (item.pagepermisson) {
                        newobject.pagepermisson = item.pagepermisson
                    }
                    newobject.grade = item.grade
                    if (item.children && item.children.length !== 0) {
                        let newitem = {}
                        newitem.data = item.children
                        newobject.children = setlist(newitem)
                    }
                    newobject.icon = iconList[item.key]
                }
                return newobject
            }
        })
        return newlist
    }
    return (
        <Sider trigger={null} collapsible collapsed={props.switch}>
            <div style={{ display: 'flex', height: '100vh', 'flexDirection': 'column' }}>
                <div className="logo" /><div />
                <div style={{ flex: 1, 'overflow': 'auto' }}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[pathname]}
                        defaultOpenKeys={['/' + pathname.split('/')[1]]}
                        items={meun}
                        onClick={(e) => { changeRouter(e) }}
                    />
                </div>
            </div>
        </Sider>
    )
}
const mapStateToHeader = (state) => {
    return {
        switch: state.sandboxReducer.switch
    }
}
export default connect(mapStateToHeader)(SideMenu)