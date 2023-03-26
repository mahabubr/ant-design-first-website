import { Table } from 'antd';
import React, { useEffect, useState } from 'react';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Company',
        dataIndex: 'company',
    },
];

const Dashboard = () => {

    const [info, setInfo] = useState([])
    useEffect(() => {
        fetch('data.json')
            .then(res => res.json())
            .then(data => setInfo(data))
    }, [])

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const data = [];
    for (let i = 0; i < info.length; i++) {
        data.push({
            key: i,
            name: info[i].name,
            gender: info[i].gender,
            phone: info[i].phone,
            email: info[i].email,
            company: info[i].company,
        });
    }

    const hasSelected = selectedRowKeys.length > 0;


    return (
        <div style={{ width: '90%', margin: '50px auto' }}>
            <div
                style={{
                    marginBottom: 16,
                }}
            >
                <span
                    style={{
                        marginLeft: 8,
                    }}
                >
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
    );
};

export default Dashboard;