import Title from 'antd/es/typography/Title'
import React from 'react'
import { Space, Table, Tag } from 'antd';

const NewRequest = () => {
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
      title: 'Screenshot',
      dataIndex: 'screenshot',
      key: 'screenshot',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <a>Review</a>
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
      screenshot: 'screenshot1.jpg'
    },
    {
      key: '2',
      name: 'Jim Green',
      recieptNo: 42,
      createdAt: '19-Sep-2023',
      screenshot: 'screenshot2.jpg'
    },
    {
      key: '3',
      name: 'Joe Black',
      recieptNo: 32,
      createdAt: '19-Sep-2023',
      screenshot: 'screenshot3.jpg'
    },
  ];

  return (
    <div>
      <Title level={3} className='text-center my-3'>Recent Requests</Title>
      <hr className='my-4'/>
      <Table dataSource={data} columns={columns} />
    </div>
  )
}

export default NewRequest