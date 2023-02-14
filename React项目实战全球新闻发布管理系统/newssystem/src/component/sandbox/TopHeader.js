import React from 'react'
import { Layout, Dropdown, Space, Menu, Avatar } from 'antd';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons';
const { Header } = Layout;
function TopMenu(props) {
    const users = JSON.parse(localStorage.getItem('token'))
    const { username, role: { roleName } } = users
    const navigate = useNavigate()
    function outlogin() {
        localStorage.removeItem('token')
        navigate('/login')
    }
    const menu = (
        <Menu
            items={[
                {
                    label: (
                        <span>
                            {roleName}
                        </span>
                    ),
                    key: '0',
                },
                {
                    label: (
                        <span onClick={outlogin}>
                            退出
                        </span>
                    ),
                    key: '1',
                    danger: true,
                },
            ]}
        />
    );
    return (
        <div>
            <Header
                className="site-layout-background"
                style={{
                    padding: '0 16px',
                }}
            >
                {
                    props.switch ? <MenuUnfoldOutlined onClick={() => { props.changeSwitch(false) }} /> : <MenuFoldOutlined onClick={() => { props.changeSwitch(true) }} />
                }
                <div style={{ float: "right" }}>
                    <span style={{ margin: '0px 5px' }}>欢迎<span style={{ color: '#1890ff' }}> {username} </span>回来</span>
                    <Dropdown overlay={menu} arrow>
                        <span>
                            <Space>
                                <Avatar style={{ backgroundColor: '#87d068' }} size={40} icon={<UserOutlined />} />
                            </Space>
                        </span>
                    </Dropdown>
                </div>
            </Header >
        </div >
    )
}
const mapStateToHeader = (state) => {
    return {
        switch: state.sandboxReducer.switch
    }
}
const mapDispatchSideMenu = {
    changeSwitch(change) {
        return {
            type: 'changeSwitch',
            title: change
        }
    }
}
export default connect(mapStateToHeader, mapDispatchSideMenu)(TopMenu)