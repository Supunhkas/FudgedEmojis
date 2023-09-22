import Title from 'antd/es/typography/Title'
import React from 'react'
import { Space, Table, Tag } from 'antd';

const WaitingForSpin = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Reciept No',
      dataIndex: 'recieptNo',
      key: 'recieptNo',
    },
    {
      title: 'Request Date',
      dataIndex: 'createdAt',
      key: 'date',
    },
    {
      title: 'Accepted Date',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Review</a>
          <a>Block</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      recieptNo: 32,
      createdAt: '19-Sep-2023',
      updatedAt: '23-Sep-2023',
    },
    {
      key: '2',
      name: 'Jim Green',
      recieptNo: 42,
      createdAt: '19-Sep-2023',
      updatedAt: '23-Sep-2023',
    },
    {
      key: '3',
      name: 'Joe Black',
      recieptNo: 32,
      createdAt: '19-Sep-2023',
      updatedAt: '23-Sep-2023',
    },
  ];

  return (
    <div>
      <Title level={3} className='text-center my-3'>Waiting For Spin Result</Title>
      <hr className='my-4'/>
      <Table dataSource={data} columns={columns} />
    </div>
  )
}

export default WaitingForSpin