import Title from 'antd/es/typography/Title'
import React, { useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

const NewRequest = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const accessToken = localStorage.getItem("token");

  const [newRequests,setNewRequests] = useState([])
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    axios.get(`${baseUrl}/request/all`, config).then((res) => {
      setNewRequests(res.data)
       
    }).catch((err) => {
      console.log(err)
    })
  },[])

  const sendRequestWithKeys = newRequests.map(item => ({
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
      key: 'receiptNo',
    },
    {
      title: 'Request Date',
      dataIndex: 'createdAt',
      key: 'date',
      render: (text) => moment  (text).format('DD-MMM-YYYY'),
    },
    {
      title: 'Screenshot',
      dataIndex: 'imgUrl',
      key: 'screenshot',
      render: (text) => <img src={text} alt="Screenshot" style={{ maxWidth: '50px' }} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleReview(record._id)}>Review</a>
        </Space>
      ),
    },
  ];

  const handleReview = (id) => {
    let requestId = id;
    const approveDate = new Date();

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const data = {
      status: 1,
      approvedDate: approveDate.toISOString(),
    }
    axios
      .put(`${baseUrl}/request/update/${requestId}`,data, config)
      .then((res) => {
        console.log(res.data)
        toast.success('Request Approved successfully');

        setNewRequests((preList) => {
          const updateList = preList.filter(
            (item) => item._id !== requestId
          );
          return updateList;
        });
    
      })
      .catch((err) => {
        console.log(err);
        toast.error('Request not approved ');
      });
  };
  

  return (
    <div>
      <Title level={3} className='text-center my-3'>Recent Requests</Title>
      <hr className='my-4'/>
      <Table dataSource={sendRequestWithKeys} columns={columns} />
    </div>
  )
}

export default NewRequest