import Title from 'antd/es/typography/Title'
import React, { useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd';
import axios from 'axios';
import moment from 'moment';

const Rejected = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const accessToken = localStorage.getItem("token");

  const [rejectRequest,setRejectRequest] = useState([])
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    axios.get(`${baseUrl}/request/rejected`, config).then((res) => {
      setRejectRequest(res.data)
      console.log(res.data)  
    }).catch((err) => {
      console.log(err)
    })
  },[])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'spinBy',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Reciept No',
      dataIndex: 'receiptNo',
      key: 'recieptNo',
    },
    {
      title: 'Request Date',
      dataIndex: 'createdAt',
      key: 'date',
      render: (text) => moment(text).format('DD-MMM-YYYY'),
    },
    {
      title: 'Rejected Date',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      render: (text) => moment(text).format('DD-MMM-YYYY'),
    },
    {
      title: 'Comment',
      dataIndex: 'remarks',
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
      <Table dataSource={rejectRequest} columns={columns} />
    </div>
  )
}

export default Rejected