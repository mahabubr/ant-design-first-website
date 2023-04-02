import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

const SendEmail = () => {

    const onFinish = (values) => {
        fetch('http://localhost:3000/student/sendemail', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(e => console.log(e.message))
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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
                    gridTemplateColumns: '1fr',
                    gap: '0 30px'
                }}>
                    <Form.Item
                        label="To"
                        name="to"
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
                        label="Subject"
                        name="subject"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your subject!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Text"
                        name="text"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Text!',
                            },
                        ]}
                    >
                        <TextArea
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />
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
    );
};

export default SendEmail;