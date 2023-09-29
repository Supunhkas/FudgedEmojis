import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import ReviewModal from "../../components/ReviewModel";

const WaitingForSpin = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const accessToken = localStorage.getItem("token");

  const [waitList, setWaitList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [selectedRequestData, setSelectedRequestData] = useState(null);

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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleReject = (id) => {
    let requestId = id;

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const data = {
      status: 9,
    };
    axios
      .put(`${baseUrl}/request/update/${requestId}`, data, config)
      .then((res) => {
        toast.success("Request rejected successfully");

        setWaitList((prevWaitList) => {
          const updatedWaitList = prevWaitList.filter(
            (item) => item._id !== requestId
          );
          return updatedWaitList;
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Request not rejected ");
      })
      .finally(() => {
        setIsModalOpen(false);
      });
  };

  const sendRequestWithKeys = waitList.map((item) => ({
    ...item,
    key: item._id,
  }));

  const handleReview = (id) => {
    setSelectedRequestId(id);

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .get(`${baseUrl}/request/getOne/${id}`, config)
      .then((res) => {
        setSelectedRequestData(res.data);
        console.log(res.data);
        showModal();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        showModal();
      });
  };

  const handleOk = () => {
    toast.success("Approved Request! Wait for User spin result");
    // Close the modal
    setIsModalOpen(false);
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
      render: (text) => moment(text).format("DD-MMM-YYYY"),
    },
    {
      title: "Accepted Date",
      dataIndex: "approvedDate",
      key: "approvedDate",
      render: (text) => moment(text).format("DD-MMM-YYYY"),
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
      {isModalOpen && (
        <ReviewModal
          data={selectedRequestData}
          isOpen={isModalOpen}
          onOk={handleOk}
          onCancel={handleModalCancel}
          onReject={handleReject}
        />
      )}
      <Title level={3} className="text-center my-3">
        Waiting For Spin Result
      </Title>
      <hr className="my-4" />
      <Table dataSource={sendRequestWithKeys} columns={columns} className="overflow-x-auto"/>
    </div>
  );
};

export default WaitingForSpin;
