import React from 'react';
import { Button, Form, Input, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


// const props = {
//     name: 'myfile',
//     action: 'http://localhost:3000/student/signup',
//     headers: {
//         authorization: 'authorization-text',
//     },
//     onChange(info) {
//         if (info.file.status !== 'uploading') {
//             console.log(info.file, info.fileList);
//         }
//         if (info.file.status === 'done') {
//             message.success(`${info.file.name} file uploaded successfully`);
//         } else if (info.file.status === 'error') {
//             message.error(`${info.file.name} file upload failed.`);
//         }
//     },
// };

const SignUp = () => {

    const onFinish = (values) => {
        const file = values.myfile.file.originFileObj

        const formData = new FormData()
        formData.append('file', file)

        const formValues = {
            isActive: true,
            email: values.email,
            fullname: values.fullname,
            info: values.info,
            password: values.password,
            phone: values.phone,
            CGPA: values.CGPA,
            filename: 'adfhjadfjh',
            myfile: formData
        }
        console.log(formValues);
        fetch('http://localhost:3000/student/signup', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formValues)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(e => console.log(e))
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
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0 30px'
                }}>
                    <Form.Item
                        label="Full Name"
                        name="fullname"
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
                        label="CGPA"
                        name="CGPA"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your CGPA!',
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
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Info"
                        name="info"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your information!',
                            },
                        ]}
                    >
                        <Input />
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
                        label="Photo Upload"
                        name="myfile" >
                        <Upload>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
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

export default SignUp;