import React, { forwardRef, useEffect, useState } from 'react'
import { Form, Input, Select } from 'antd';
import axios from 'axios';
const UserForm = forwardRef((props, ref) => {
    const [regions, setRegions] = useState([])
    const [roleList, setRoleList] = useState([])
    const [isDisabled, setisDisabled] = useState(false)
    const { isUpdateDisable, isUpdate } = props
    const users = JSON.parse(localStorage.getItem('token'))
    const { roleId, region } = users
    const roleobj = {
        "1": 'superadmin',
        "2": 'admin',
        "3": 'editor'
    }
    const checkRegionDisabled = (item) => {
        //用户更新时使用表单
        if (isUpdate) {
            //如果是超级管理员
            if (roleobj[roleId] === 'superadmin') {
                return false
            } else {
                return true
            }//用户增加时使用的表单     
        } else {
            //如果是超级管理员
            if (roleobj[roleId] === 'superadmin') {
                return false
            } else {
                return item && item.value !== region
            }
        }
    }
    const checkRoleDisabled = (item) => {
        //用户更新时使用表单
        if (isUpdate) {
            //如果是超级管理员
            if (roleobj[roleId] === 'superadmin') {
                return false
            } else {
                return true
            }
            //用户增加时使用的表单
        } else {
            //如果是超级管理员
            if (roleobj[roleId] === 'superadmin') {
                return false
            } else {
                return roleobj[item.id] !== 'editor'
            }
        }
    }
    useEffect(() => {
        axios.get('/regions').then(res => {
            setRegions(res.data)
        })
        setisDisabled(isUpdateDisable)
    }, [isUpdateDisable])
    useEffect(() => {
        axios.get('/roles').then(res => {
            setRoleList(res.data)
        })
    }, [])
    return (
        <Form
            layout="vertical"
            ref={ref}
        >
            <Form.Item
                name="username"
                label="用户名"
                rules={[
                    {
                        required: true,
                        message: '请输入用户名!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                rules={[
                    {
                        required: true,
                        message: '请输入密码!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="region"
                label="区域"
                rules={isDisabled ? [] : [
                    {
                        required: true,
                        message: '请选择区域!',
                    },
                ]}
            >
                <Select disabled={isDisabled} >
                    {regions.map(item => {
                        return <Select.Option value={item.value} key={item.id} disabled={checkRegionDisabled(item)}>{item.value}</Select.Option>
                    })}
                </Select>
            </Form.Item>
            <Form.Item
                name="roleId"
                label="角色"
                rules={[
                    {
                        required: true,
                        message: '请选择角色!',
                    },
                ]}
            >
                <Select onChange={(value) => {
                    if (value === 1) {
                        setisDisabled(true)
                        ref.current.setFieldsValue({
                            region: ''
                        })
                    } else {
                        setisDisabled(false)
                    }
                }}>
                    {roleList.map(item => {
                        return <Select.Option value={item.id} key={item.id} disabled={checkRoleDisabled(item)}>{item.roleName}</Select.Option>
                    })}
                </Select>
            </Form.Item>
        </Form>
    )
})
export default UserForm