import React, { useEffect, useState } from 'react'
import { Table, Button, notification } from 'antd';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function Audit() {
    const users = JSON.parse(localStorage.getItem('token'))
    const { region, roleId, username } = users
    const [roleslist, setUserList] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const roleobj = {
            "1": 'superadmin',
            "2": 'admin',
            "3": 'editor'
        }
        axios.get(`/news?auditState=1&_expand=category`).then(res => {
            let newlist = res.data
            setUserList(roleobj[roleId] === 'superadmin' ? newlist : [
                ...newlist.filter(item => item.author === username),
                ...newlist.filter(item => item.region === region && roleobj[item.roleId] === 'editor')
            ])
        })
    }, [region, roleId, username])
    const columns = [
        {
            title: '新闻标题',
            render: (item) => {
                return <span onClick={() => { navigate(`/news-manage/preview/${item.id}`) }} style={{ color: "#15C6E5", cursor: 'pointer' }}>{item.title}</span>
            }
        },
        {
            title: '作者',
            dataIndex: 'author',
        },
        {
            title: '新闻分类',
            dataIndex: 'category',
            render: (item) => {
                return item.title
            }
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button type="primary" onClick={() => { handleAudti(item, 2, 1) }} >通过</Button>
                    <Button onClick={() => { handleAudti(item, 3, 0) }} >驳回</Button>
                </div>
            }
        },
    ];
    const handleAudti = (item, auditState, publishState) => {
        // console.log(item, check)
        //同步前端
        setUserList(roleslist.filter(data => data.id !== item.id))
        axios.patch(`/news/${item.id}`, {
            auditState,
            publishState
        }).then(res => {
            notification.info({
                message: `通知`,
                description:
                    `您可以到[审核管理/审核列表]中查看您的新闻`,
                placement: 'bottomRight'
            });
        })
    }
    return (
        <div>
            <Table dataSource={roleslist} columns={columns} pagination={{ pageSize: '5' }} rowKey={(item) => item.id} />
        </div>
    )
}
