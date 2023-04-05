import { Button, Form, Input, message, Modal, Popconfirm, Table } from 'antd';
import React, { useState } from 'react';
import usePost from '../hooks/usePost';
import useInsert from '../hooks/useInsert';
import useUpdate from '../hooks/useUpdate';
import useDelete from '../hooks/useDelete';

const Admin = () => {

    const [key, setKey] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [insetData, setInsertData] = useState({})
    const [updatedData, setUpdatedData] = useState({})
    const [deletedKey, setDeletedKey] = useState('')

    const [info] = usePost()
    const [inset] = useInsert(insetData)
    const [updateData] = useUpdate(updatedData, key)
    const [deletedItem] = useDelete(deletedKey)

    if (inset.id) {
        message.open({
            type: 'success',
            content: 'User Added',
        });
    }
    if (updateData.affected) {
        message.open({
            type: 'success',
            content: 'User Update',
        });
    }
    if (deletedItem.affected) {
        message.open({
            type: 'success',
            content: 'Delete Successful',
        });
    }

    const showModal = (key) => {
        setKey(key);
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        setInsertData(values)
    };

    const handleUpdateForm = (values) => {
        setUpdatedData(values)
    }

    const handleDelete = (key) => {
        setDeletedKey(key)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleUpdateFormFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const columns = [
        {
            title: 'title',
            dataIndex: 'title',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'x',
            render: (_, record) => info.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                    <a href='/' >Delete</a>
                </Popconfirm>
            ) : null,
        },
        {
            title: 'Update',
            dataIndex: 'update',
            key: 'x',
            render: (_, record) => info.length >= 1 ? (
                <Button type="primary" onClick={() => showModal(record)}>
                    Update
                </Button>
            ) : null,
        },
    ];

    return (
        <div>
            <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    layout={'vertical'}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        gap: '0 30px'
                    }}>
                        <Form.Item
                            label="Full Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your full name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    required: true,
                                    message: 'Please input valid email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your address!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 20,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div style={{ width: '80%', margin: '0 auto' }}>
                <Table
                    columns={columns}
                    dataSource={info}
                />
            </div>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    layout={'vertical'}
                    onFinish={handleUpdateForm}
                    onFinishFailed={handleUpdateFormFailed}
                    autoComplete="off"
                >
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        gap: '0 30px'
                    }}>
                        <Form.Item
                            label="Full Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your full name!',
                                },
                            ]}
                        >
                            <Input defaultValue={key?.name} />
                        </Form.Item>
                    </div>
                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 20,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Update Information
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Admin;