import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import axios from "axios";
import moment from "moment";

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
      .get(`${baseUrl}/request/no-spinner`, config)
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
    console.log(requestId);
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .put(`${baseUrl}/request/update/:${requestId}`, config)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

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
      dataIndex: "updatedAt",
      key: "updatedAt",
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
      <Table dataSource={waitList} columns={columns} />
    </div>
  );
};

export default WaitingForSpin;
