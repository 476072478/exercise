import React, { useEffect, useState, useRef } from 'react'
import { Table, Button, Switch, Modal, } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import UserForm from '../../component/user-manage/UserForm';
export default function UserList() {
  const [userlist, setUserList] = useState([])
  const [isAddVisible, setIsAddVisible] = useState(false)
  const [isUpdateVisible, setUpdateVisible] = useState(false)
  const [solve, setsolve] = useState()
  const [isUpdateDisable, setIsUpdateDisable] = useState(true)
  const [userid, setUserid] = useState()
  const [checkregions, setCheckregions] = useState([])
  const formref = useRef()
  const updateformref = useRef()
  const users = JSON.parse(localStorage.getItem('token'))
  const { region, roleId, username } = users
  const [roleslist, setrolelist] = useState([])
  useEffect(() => {
    const roleobj = {
      "1": 'superadmin',
      "2": 'admin',
      "3": 'editor'
    }
    axios.get('/users?_expand=role').then(res => {
      let newlist = res.data
      setUserList(roleobj[roleId] === 'superadmin' ? newlist : [
        ...newlist.filter(item => item.username === username),
        ...newlist.filter(item => item.region === region && roleobj[item.roleId] === 'editor')
      ])
    })
  }, [region, roleId, username])
  useEffect(() => {
    axios.get('/roles').then(res => {
      setrolelist(res.data)
    })
  }, [])
  useEffect(() => {
    if (isUpdateVisible) {
      solveUpdate(solve)
    }
  }, [isUpdateVisible, solve])
  useEffect(() => {
    axios.get('/regions').then(res => {
      let newres = res.data.map(item => {
        item.text = item.title
        return item
      })
      setCheckregions(newres)
    })
  }, [])
  function changedefault(item, all) {
    axios.patch(`/users/${all.id}`, {
      roleState: item
    })
  }
  function handleUpdate(item) {
    setUpdateVisible(true)
    setsolve(item)
    setUserid(item.id)
  }
  function solveUpdate(solve) {
    if (solve.roleId === 1) {
      //禁用
      setIsUpdateDisable(true)
    } else {
      //取消禁用
      setIsUpdateDisable(false)
    }
    updateformref.current.setFieldsValue(solve)
  }
  const { confirm } = Modal
  function confirmMethod(item) {
    confirm({
      title: '您确定要删除？',
      icon: <ExclamationCircleOutlined />,
      onOk() { deleteMethod(item) },
      onCancel() { },
    });
  }
  function deleteMethod(item) {
    //同步前端
    let newuserlist = userlist.filter(res => res.id !== item.id)
    setUserList(newuserlist)
    //同步后端
    axios.delete(`/users/${item.id}`)
  }
  function addFormOK() {
    formref.current.validateFields().then(value => {
      setIsAddVisible(false)
      //post到后端，生成id，再设置datasource，方便后面的删除和更新
      axios.post(`/users`, {
        ...value,
        'roleState': true,
        'default': false,
      }).then(res => {
        //前端同步
        setUserList([
          ...userlist,
          {
            ...res.data,
            role: roleslist.filter(data => value.roleId === data.id)[0]
          }
        ])
      })
    }).catch(err => {

    })
  }
  function updateFormOK() {
    updateformref.current.validateFields().then(value => {
      setUpdateVisible(false)
      //同步前端
      let newuserlist = userlist.map(item => {
        if (item.id === userid) {
          return {
            ...item,
            ...value,
            role: roleslist.filter(data => value.roleId === data.id)[0]
          }
        }
        return item
      })
      setUserList(newuserlist)
      //同步后端
      axios.patch(`/users/${userid}`, value)
    }).catch(err => {

    })
  }
  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      render: (region) => {
        return <b>{region || '全球'}</b>
      },
      filters: [{
        text: "全球",
        value: "全球"
      },
      ...checkregions],
      onFilter: (value, record) => {
        if (value === '全球') {
          return record.region === ''
        }
        return value === record.region
      },
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role) => {
        return <p>{role.roleName}</p>
      },
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState, all) => {
        return <Switch defaultChecked={roleState} onChange={(item) => { changedefault(item, all) }} disabled={all.default} />
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} onClick={() => { confirmMethod(item) }} disabled={item.id === 1} />
          <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => { handleUpdate(item) }} disabled={item.default} />
        </div>
      }
    },
  ];
  return (
    <div>
      <Button onClick={() => { setIsAddVisible(true) }}>添加用户</Button>
      <Table dataSource={userlist} columns={columns} pagination={{ pageSize: '5' }} rowKey={(item) => item.id} />
      <Modal
        visible={isAddVisible}
        title="添加用户"
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setIsAddVisible(false)
        }}
        onOk={() => { addFormOK() }}
      >
        <UserForm ref={formref} />
      </Modal>
      <Modal
        visible={isUpdateVisible}
        title="更新用户"
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setUpdateVisible(false)
          setIsUpdateDisable(!isUpdateDisable)
        }}
        onOk={() => { updateFormOK() }}
      >
        <UserForm ref={updateformref} isUpdateDisable={isUpdateDisable} isUpdate={true} />
      </Modal>
    </div>
  )
}
