import React from 'react'
import './Login.css'
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function Login() {
    const navigate = useNavigate()
    const onFinish = (values) => {
        const { username, password } = values
        axios.get(`/users?username=${username}&password=${password}&roleType=true&_expand=role`).then(res => {
            if (res.data.length === 0) {
                message.error('用户名称与密码不匹配')
            } else {
                localStorage.setItem('token', JSON.stringify(res.data[0]))
                navigate("/")
            }
        })
    };
    return (
        <div className='LoginStyle'>
            <div className='LoginConter'>
                <div className='Logintext'>新闻发布系统</div>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入你的名称!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入你的密码!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登 录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
