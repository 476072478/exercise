import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Tree } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
export default function Rolelist() {
    const [userlist, setUserList] = useState([])
    const [rightList, setRightList] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentRights, setCurrentRights] = useState([])
    const [usrlistid, setUsrlistid] = useState(Number)
    useEffect(() => {
        axios.get('/roles').then(res => {
            setUserList(res.data)
        })
    }, [])
    useEffect(() => {
        axios.get('/rights?_embed=children').then(res => {
            setRightList(res.data)
        })
    }, [])
    const showModal = (item) => {
        setIsModalVisible(true);
        setCurrentRights(item.rights)
        setUsrlistid(item.id)
    };
    const handleOk = () => {
        setIsModalVisible(false);
        let newuserlist = userlist.map(item => {
            if (item.id === usrlistid) {
                item.rights = Array.isArray(currentRights) ? currentRights : currentRights.checked
            }
            return item
        })
        setUserList(newuserlist)
        //同步后端
        axios.patch(`/roles/${usrlistid}`, {
            rights: Array.isArray(currentRights) ? currentRights : currentRights.checked
        })
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onCheck = (checkedKeys) => {
        setCurrentRights(checkedKeys)
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
            key: 'roleName',
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} onClick={() => { confirmMethod(item) }} />
                    <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => { showModal(item) }} />
                </div>
            }
        },
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
    function deleteMethod(item) {
        //同步当前界面
        let newlist = userlist.filter(res => res.id !== item.id)
        setUserList(newlist)
        //同步后端
        axios.delete(`/roles/${item.id}`)
    }
    return (
        <div>
            <Table dataSource={userlist} columns={columns} pagination={{ pageSize: '5' }} rowKey={(item) => item.id} />
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Tree
                    checkable
                    checkStrictly
                    onCheck={onCheck}
                    checkedKeys={currentRights}
                    treeData={rightList}
                />
            </Modal>
        </div>
    )
}
