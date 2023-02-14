import React, { useEffect, useState, useRef, useContext } from 'react'
import { Button, Table, Modal, Form, Input } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
export default function NewCategory() {
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        axios.get('/categories').then(res => {
            setDataSource(res.data)
        })
    }, [])
    const handleSave = (record) => {
        //同步前端
        setDataSource(dataSource.map(item => {
            if (item.id === record.id) {
                return {
                    id: record.id,
                    title: record.title,
                    value: record.title
                }
            }
            return item
        }))
        //同步后端
        axios.patch(`/categories/${record.id}`, {
            title: record.title,
            value: record.title
        })
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '栏目名称',
            dataIndex: 'title',
            onCell: (record) => ({
                record,
                editable: true,
                dataIndex: 'title',
                title: '栏目名称',
                handleSave: handleSave,
            })
        },
        {
            title: '操作',
            render: (data) => {
                return <Button danger shape='cirle' type="primary" icon={<DeleteOutlined />} onClick={() => { confirmMethod(data) }}></Button>
            }
        },
    ];
    //点击删除操作出现提示
    const { confirm } = Modal
    function confirmMethod(data) {
        confirm({
            title: '您确定要删除？',
            icon: <ExclamationCircleOutlined />,
            onOk() { deleteMethod(data) },
            onCancel() { },
        });
    }

    //删除操作
    function deleteMethod(data) {
        //同步前端
        setDataSource(dataSource.filter(item => item.id !== data.id))
        //同步后端
        axios.delete(`/categories/${data.id}`)
    }


    const EditableContext = React.createContext(null);
    const EditableRow = ({ index, ...props }) => {
        const [form] = Form.useForm();
        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                    <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
    };
    const EditableCell = ({
        title,
        editable,
        children,
        dataIndex,
        record,
        handleSave,
        ...restProps
    }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef(null);
        const form = useContext(EditableContext);
        useEffect(() => {
            if (editing) {
                inputRef.current.focus();
            }
        }, [editing]);

        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({
                [dataIndex]: record[dataIndex],
            });
        };

        const save = async () => {
            try {
                const values = await form.validateFields();
                toggleEdit();
                handleSave({ ...record, ...values });
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };

        let childNode = children;

        if (editable) {
            childNode = editing ? (
                <Form.Item
                    style={{
                        margin: 0,
                    }}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]}
                >
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                </Form.Item>
            ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
        }

        return <td {...restProps}>{childNode}</td>;
    };
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id}
                components={{
                    body: {
                        row: EditableRow,
                        cell: EditableCell,
                    }
                }} />
        </div>
    )
}
