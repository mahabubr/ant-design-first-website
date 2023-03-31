import { Button, Form, Input, message, Modal, Popconfirm, Table } from 'antd';
import React, { useEffect, useState } from 'react';

const Admin = () => {
    const [key, setKey] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const [info, setInfo] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/reg/index')
            .then(res => res.json())
            .then(data => setInfo(data))
    }, [])

    const onFinish = (values) => {
        fetch('http://localhost:3000/reg/insertadmin', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    message.open({
                        type: 'success',
                        content: 'User Added',
                    });

                }
            })
            .catch(e => console.log(e.message))
    };

    const handleUpdateForm = (values) => {
        fetch(`http://localhost:3000/reg/updateadmin/${key.id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(data => {
                if (data.affected) {
                    message.open({
                        type: 'success',
                        content: 'Update Admin Info',
                    });

                }
            })
            .catch(e => console.log(e.message))
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleUpdateFormFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
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
                    <a>Delete</a>
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

    const handleDelete = (key) => {
        fetch(`http://localhost:3000/reg/deleteadmin/${key}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                if (data.affected) {
                    message.open({
                        type: 'success',
                        content: 'Admin Deleted Successful',
                    });
                    const newData = info.filter((item) => item.id !== key);
                    setInfo(newData);
                }
            })
            .catch(e => console.log(e.message))
    }

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