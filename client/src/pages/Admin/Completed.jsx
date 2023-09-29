import Title from 'antd/es/typography/Title'
import React, { useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd';
import axios from 'axios'
import moment from 'moment'

const Completed = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const accessToken = localStorage.getItem("token");

  const [request,setRequest] = useState([])
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    axios.get(`${baseUrl}/request/completed`, config).then((res) => {
      setRequest(res.data)
     
    }).catch((err) => {
      console.log(err)
    })
  },[])

  const sendRequestWithKeys = request.map(item => ({
    ...item,
    key: item._id 
  }));

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
      title: 'Voucher Type',
      key: 'type',
      dataIndex: 'voucherType', 
      render: (_, record) => {
    
        const color = record.voucherType === "Amazon" ? 'green' : 'geekblue';
    
        return (
          <Tag color={color}>
            {record.voucherType}
          </Tag>
        );
      },
  
    },
    {
      title: 'Spin Result',
      dataIndex: 'spinnerResult',
      key: 'result',
      render: (text) => <span>{text}%</span>,
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
  

  return (
    <div>
      <Title level={3} className='text-center my-3'>Completed</Title>
      <hr className='my-4' />
      <Table dataSource={sendRequestWithKeys} columns={columns} className="overflow-x-auto"/>
    </div>
  )
}

export default Completed