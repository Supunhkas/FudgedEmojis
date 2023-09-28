import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import axios from "axios";
import moment from "moment";
import {toast} from "react-toastify"
import SendEmailModal from "../../components/SendEmailModal";
const SendEmails = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const accessToken = localStorage.getItem("token");

  const [sendRequest, setSendRequest] = useState([]);
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .get(`${baseUrl}/request/after-spin`, config)
      .then((res) => {
        setSendRequest(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sendRequestWithKeys = sendRequest.map((item) => ({
    ...item,
    key: item._id,
  }));

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
      render: (text) => moment(text).format("DD-MMM-YYYY"),
    },
    {
      title: "Voucher Type",
      key: "type",
      dataIndex: "voucherType",
      render: (_, record) => {
    
        const color = record.voucherType === "Amazon" ? 'green' : 'volcano';
    
        return (
          <Tag color={color}>
            {record.voucherType}
          </Tag>
        );
      },
     
    },
    {
      title: "Spin Result",
      dataIndex: "spinnerResult",
      key: "result",
      render: (text) => <span>{text}%</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleSendMail(record._id)}> Send email </a>
        </Space>
      ),
    },
  ];
  

  const handleSendMail = (id) => {

    let requestId = id;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const selectedRequest = sendRequest.find((item) => item._id === id);
    if (selectedRequest) {
      const {
        receiptNo,
        spinnerResult,
        voucherType,
        voucherCode,
        remarks,
        createdUser
      } = selectedRequest;
      const data = {
        to:createdUser ,
        subject: "Your Voucher Code",
        receiptNo,
        spinnerResult,
        voucherType,
        voucherCode,
        remarks,
      };
    axios
      .post(`${baseUrl}/request/email/${requestId}`,data, config)
      .then((res) => {
        console.log(res.data)
        toast.success('Email send successfully');  
        const data = {
          status: 5,
          mailSent: true, 
        }
        axios
          .put(`${baseUrl}/request/update/${requestId}`,data, config)
          .then((res) => {
            console.log(res.data)
            setSendRequest((preList) => {
              const updateList = preList.filter(
                (item) => item._id !== requestId
              );
              return updateList;
            });
        
          })
          .catch((err) => {
            console.log(err);
           
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error('Email send failed ');
      });
  };
}

  return (
    <div>
      <Title level={3} className="text-center my-3">
        Send Vouchers to the Clients
      </Title>
      <hr className="my-4" />
      <Table dataSource={sendRequestWithKeys} columns={columns} />
      {/* USE THIS MODAL TO SEND EMAILS AS NEEDED */}
      <SendEmailModal />
    </div>
  );
};

export default SendEmails;
