import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function NewsPublish(props) {
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        setDataSource(props.dataSource)
    }, [props.dataSource])
    const navigate = useNavigate()
    const pubulish = (data) => {
        //同步前端
        setDataSource(dataSource.filter(item => item.id !== data.id))
        //同步后端
        axios.patch(`/news/${data.id}`, {
            publishState: 2,
            publishTime: Date.now()
        }).then(res => {
            notification.info({
                message: `通知`,
                description:
                    `您可以到【发布管理/已发布】查看您的新闻`,
                placement: 'bottomRight'
            })
        })
    }
    const revoke = (data) => {
        setDataSource(dataSource.filter(item => item.id !== data.id))
        axios.patch(`/news/${data.id}`, {
            publishState: 3,
            publishTime: ''
        }).then(res => {
            notification.info({
                message: `通知`,
                description:
                    `您可以到【发布管理/已下线】查看您的新闻`,
                placement: 'bottomRight'
            })
        })
    }
    const delet = (data) => {
        setDataSource(dataSource.filter(item => item.id !== data.id))
        axios.delete(`/news/${data.id}`).then(res => {
            notification.info({
                message: `通知`,
                description:
                    `您已经删除已下线的新闻`,
                placement: 'bottomRight'
            })
        })
    }
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
            render: (category) => {
                return <Tag color='orange'>{category.title}</Tag>
            }
        },
        {
            title: '操作',
            render: (item) => {
                return <div>{
                    props.number === 1 ? <Button type="primary" onClick={() => { pubulish(item) }} >发布</Button> :
                        props.number === 2 ? <Button danger onClick={() => { revoke(item) }} >撤销</Button> :
                            props.number === 3 && <Button type="primary" danger onClick={() => { delet(item) }} >删除</Button>
                }
                </div>
            }
        }
    ];
    return (
        <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: '5' }} rowKey={(item) => item.id} />
    )
}
