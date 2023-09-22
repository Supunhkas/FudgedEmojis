import Title from 'antd/es/typography/Title'
import React from 'react'
import { Space, Table, Tag } from 'antd';

const Rejected = () => {
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
      title: 'Rejected Date',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Tag color={'red'}>
          {'Rejected'}
        </Tag>
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
      comment: 'wront details'
    },
    {
      key: '2',
      name: 'Jim Green',
      recieptNo: 42,
      createdAt: '19-Sep-2023',
      updatedAt: '23-Sep-2023',
      comment: 'wront details'
    },
    {
      key: '3',
      name: 'Joe Black',
      recieptNo: 32,
      createdAt: '19-Sep-2023',
      updatedAt: '23-Sep-2023',
      comment: 'wront details'
    },
  ];

  return (
    <div>
      <Title level={3} className='text-center my-3'>Completed</Title>
      <hr className='my-4' />
      <Table dataSource={data} columns={columns} />
    </div>
  )
}

export default Rejected