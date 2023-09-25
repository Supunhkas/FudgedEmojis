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
       render: (_, { voucherType }) => (  
    <>
      {Array.isArray(voucherType) ? (
        voucherType.map((tag) => {
          let color = tag === 'Amazon' ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })
      ) : (
        <Tag color="gray" key="unknown">
          Unknown
        </Tag>
      )}
    </>
  ),
    },
    {
      title: 'Spin Result',
      dataIndex: 'spinnerResult',
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
      <Table dataSource={request} columns={columns} />
    </div>
  )
}

export default Completed