import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, Modal, Popover, Switch } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
export default function Rightlist() {
  useEffect(() => {
    axios.get('/rights?_embed=children').then(res => {
      const list = res.data.map(item => {
        if (item.children?.length === 0) {
          item.children = ''
        }
        return item
      })
      setDataSource(list)
    })
  }, [])
  const [dataSource, setDataSource] = useState([])
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (dataIndex) => {
        return <Tag color='orange'>{dataIndex}</Tag>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} onClick={() => { confirmMethod(item) }} />
          <Popover content={<div>
            <Switch checked={item.pagepermisson} onChange={() => { switchmethod(item) }} />
          </div>} title="配置项" trigger="focus">
            <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.pagepermisson === undefined} />
          </Popover>
        </div>
      }
    }
  ];
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
    if (item.grade === 1) {
      //当前页面同步状态
      setDataSource(dataSource.filter(data => data.id !== item.id))
      //后端同步
      axios.delete(`/rights/${item.id}`)
    }
    if (item.grade === 2) {
      //当前页面同步状态
      setDataSource(dataSource.map(data => {
        if (data.id === item.rightId) {
          data.children = data.children.filter(child => child.id !== item.id)
        }
        return data
      }))
      //后端同步
      axios.delete(`/children/${item.id}`)
    }
  }

  //控制后端pagepermisson权限
  function switchmethod(item) {
    //当前页面同步
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
    setDataSource([...dataSource])
    //后端同步
    if (item.grade === 1) {
      axios.patch(`/rights/${item.id}`, {
        pagepermisson: item.pagepermisson
      })
    }
    if (item.grade === 2) {
      axios.patch(`/children/${item.id}`, {
        pagepermisson: item.pagepermisson
      })
    }
  }
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: '5' }} />
    </div>
  )
}
