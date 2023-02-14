import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, notification } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import style from './NewsDraft.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
export default function NewsDraft() {
    const { username } = JSON.parse(localStorage.getItem('token'))
    const [dataSource, setDataSource] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`http://localhost:8000/news?author=${username}&auditState=0&_expand=category`).then(res => {
            const list = res.data
            setDataSource(list)
        })
    }, [username])
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (item) => {
                return <b>{item}</b>
            }
        },
        {
            title: '新闻标题',
            dataIndex: 'title',
            render: (item, data) => {
                return <p onClick={() => { navigate(`/news-manage/preview/${data.id}`) }} style={{ color: "red", cursor: 'pointer' }}>{item}</p>
            }
        },
        {
            title: '作者',
            dataIndex: 'author',
        },
        {
            title: '新闻分类',
            render: (item) => {
                return <p>{item.category.title}</p>
            }
        },
        {
            title: '操作',
            render: (item) => {
                return <div className={style.NewsDraftButton}>
                    <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} onClick={() => { confirmMethod(item) }} />
                    <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => { navigate(`/news-manage/update/${item.id}`) }} />
                    <Button type="primary" shape="circle" icon={<UploadOutlined />} onClick={() => { handleCheck(item.id) }} />
                </div>
            }
        }
    ];
    //文章提交
    function handleCheck(id) {
        axios.patch(`/news/${id}`, {
            auditState: 1
        }).then(res => {
            notification.info({
                message: `通知`,
                description:
                    `您可以到审核列表中查看您的新闻`,
                placement: 'bottomRight'
            });
            navigate('/audit-manage/list')
        })
    }
    const { confirm } = Modal
    //点击删除操作出现提示
    function confirmMethod(item) {
        confirm({
            title: '您确定要删除？',
            icon: <ExclamationCircleOutlined />,
            onOk() { deleteMethod(item) },
            onCancel() { },
        });
    }

    //删除操作
    function deleteMethod(item) {
        //当前页面同步状态
        setDataSource(dataSource.filter(data => data.id !== item.id))
        //后端同步
        axios.delete(`/news/${item.id}`)
    }
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: '5' }} rowKey={(item) => item.id} />
        </div>
    )
}
