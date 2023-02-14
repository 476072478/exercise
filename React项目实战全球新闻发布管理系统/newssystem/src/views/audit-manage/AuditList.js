import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button, Tag, notification } from 'antd';
import { useNavigate } from 'react-router-dom'
export default function AuditList() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('token'))
    const { username } = user
    const [newslist, setnewsList] = useState([])
    useEffect(() => {
        axios.get(`/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`)
            .then(res => { setnewsList(res.data) })
    }, [username])
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
            title: '审核状态',
            dataIndex: 'auditState',
            render: (item) => {
                const colorList = ['', 'orange', 'green', 'red']
                const auditStateList = ['草稿箱', '审核中', '已通过', '未通过']
                return <Tag color={colorList[item]}>{auditStateList[item]}</Tag>
            }
        },
        {
            title: '操作',
            render: (item) => {
                const auditStateCheck = ['', '撤销', '发布', '更新']
                return <div>
                    <Button type="primary" onClick={() => { handleAudit(item) }} >{auditStateCheck[item.auditState]}</Button>
                </div>
            }
        },
    ];
    function handleAudit(item) {
        //撤销操作
        if (item.auditState === 1) {
            //同步前端
            setnewsList(newslist.filter(data => data.id !== item.id))
            //同步后端
            axios.patch(`/news/${item.id}`, {
                auditState: 0
            }).then(res => {
                notification.info({
                    message: `通知`,
                    description:
                        `您可以到草稿箱查看您的新闻`,
                    placement: 'bottomRight'
                })
            })
        }
        //发布操作
        if (item.auditState === 2) {
            //同步前端
            setnewsList(newslist.filter(data => data.id !== item.id))
            //同步后端
            axios.patch(`/news/${item.id}`, {
                publishState: 2,
                publishTime: Date.now()
            }).then(res => {
                notification.info({
                    message: `通知`,
                    description:
                        `您可以到已发布中查看您的新闻`,
                    placement: 'bottomRight'
                });
                navigate(`/publish-manage/published`)
            })
        }
        //到更新界面
        if (item.auditState === 3) {
            navigate(`/news-manage/update/${item.id}`)
        }
    }
    return (
        <Table dataSource={newslist} columns={columns} pagination={{ pageSize: '5' }} rowKey={(item) => item.id} />
    )
}
