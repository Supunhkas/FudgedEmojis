import Title from 'antd/es/typography/Title'
import React from 'react'
import { Space, Table, Tag } from 'antd';

const Completed = () => {
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
      title: 'Voucher Type',
      key: 'type',
      dataIndex: 'type',
      render: (_, { type }) => (
        <>
          {type.map((tag) => {
            let color = tag == 'Amazon' ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Spin Result',
      dataIndex: 'result',
      key: 'result',
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Tag color={'green'}>
          {'Completed'}
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
      type: ['Shopify'],
      result: '89%'
    },
    {
      key: '2',
      name: 'Jim Green',
      recieptNo: 42,
      createdAt: '19-Sep-2023',
      type: ['Amazon'],
      result: '75%'
    },
    {
      key: '3',
      name: 'Joe Black',
      recieptNo: 32,
      createdAt: '19-Sep-2023',
      type: ['Amazon'],
      result: '65%'
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

export default Completed