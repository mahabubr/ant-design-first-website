import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import { Link } from 'react-router-dom';

const FormField = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [value, setValue] = useState({})
    const { Option } = Select
    const [form] = Form.useForm();

    const onFinish = (values) => {
        setModalOpen(true)
        setValue(values)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onReset = () => {
        form.resetFields();
    };

    console.log(value);

    return (
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
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0 30px'
                }}>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
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
                                message: 'Please input valid email address!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select a option"
                            allowClear
                        >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                            <Option value="other">other</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Password must be 8 characters!',
                                min: 8
                            },

                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Date of Birth"
                        name="dateOfBirth"
                        rules={[
                            {
                                required: true,
                                message: 'Please input date of birth!',
                            },
                        ]}
                    >
                        <DatePicker />
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
                    <Button style={{ marginLeft: '10px' }} htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
            <Modal
                title="Vertically centered modal dialog"
                centered
                open={modalOpen}
                onOk={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
            >
                {
                    value &&
                    <>
                        <p>{value.username}</p>
                        <p>{value.fullName}</p>
                        <p>{value.email}</p>
                        <p>{value.gender}</p>
                        <p>{value.password}</p>
                        <Link to='/dashboard'>
                            <Button type="dashed" danger size={'large'}>
                                Go To Dashboard
                            </Button>
                        </Link>
                    </>
                }
            </Modal>
        </div>
    );
};

export default FormField;