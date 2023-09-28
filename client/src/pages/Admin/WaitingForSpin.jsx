import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import axios from "axios";
import moment from "moment";
import {toast} from "react-toastify"

const WaitingForSpin = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const accessToken = localStorage.getItem("token");

  const [waitList, setWaitList] = useState([]);
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .get(`${baseUrl}/request/waiting`, config)
      .then((res) => {
        setWaitList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleReject = (id) => {
    let requestId = id;

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const data = {
      status: 9
    }
    axios
      .put(`${baseUrl}/request/update/${requestId}`,data, config)
      .then((res) => {
        console.log(res.data)
        toast.success('Request rejected successfully');

        setWaitList((prevWaitList) => {
          const updatedWaitList = prevWaitList.filter(
            (item) => item._id !== requestId
          );
          return updatedWaitList;
        });
    
      })
      .catch((err) => {
        console.log(err);
        toast.error('Request not rejected ');
      });
  };

  const sendRequestWithKeys = waitList.map(item => ({
    ...item,
    key: item._id 
  }));

  const handleReview = (id) => {
    console.log(id);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "spinBy",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Reciept No",
      dataIndex: "receiptNo",
      key: "recieptNo",
    },
    {
      title: "Request Date",
      dataIndex: "createdAt",
      key: "date",
      render: (text) => moment(text).format('DD-MMM-YYYY'),
    },
    {
      title: "Accepted Date",
      dataIndex: "approvedDate",
      key: "approvedDate",
      render: (text) => moment(text).format('DD-MMM-YYYY'),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleReview(record._id)}>Review</a>
          <a onClick={() => handleReject(record._id)}>Block</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={3} className="text-center my-3">
        Waiting For Spin Result
      </Title>
      <hr className="my-4" />
      <Table dataSource={sendRequestWithKeys} columns={columns} />
    </div>
  );
};

export default WaitingForSpin;
