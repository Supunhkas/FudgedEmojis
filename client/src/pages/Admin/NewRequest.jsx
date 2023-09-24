import Title from 'antd/es/typography/Title'
import React, { useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd';
import axios from 'axios';

const NewRequest = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const accessToken = localStorage.getItem("token");

  const [spinData,setSpinData] = useState([])
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    axios.get(`${baseUrl}/request/all`, config).then((res) => {
      setSpinData(res.data)
      console.log(res.data)  
    }).catch((err) => {
      console.log(err)
    })
  },[])
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