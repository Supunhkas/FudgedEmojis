import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import ReviewModal from "../../components/ReviewModel";

const NewRequest = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const accessToken = localStorage.getItem("token");

  const [newRequests, setNewRequests] = useState([]);
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
      .get(`${baseUrl}/request/all`, config)
      .then((res) => {
        setNewRequests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sendRequestWithKeys = newRequests.map((item) => ({
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
      key: "receiptNo",
    },
    {
      title: "Request Date",
      dataIndex: "createdAt",
      key: "date",
      render: (text) => moment(text).format("DD-MMM-YYYY"),
    },
    {
      title: "Screenshot",
      dataIndex: "imgUrl",
      key: "screenshot",
      render: (text) => (
        <img src={text} alt="Screenshot" style={{ maxWidth: "50px" }} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleReview(record._id)}>Review</a>
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleModalCancel = () => {
    setIsModalOpen(false);
  };
  const handleReject = (id) => {
    const requestId = id;
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

        setNewRequests((prevRequest) => {
          const updatedReqList = prevRequest.filter(
            (item) => item._id !== requestId
          );
          return updatedReqList;
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
    if (selectedRequestId) {
      let requestId = selectedRequestId;
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
      };

      axios
        .put(`${baseUrl}/request/update/${requestId}`, data, config)
        .then((res) => {
          
          toast.success("Request Approved successfully");

          setNewRequests((preList) => {
            const updateList = preList.filter((item) => item._id !== requestId);
            return updateList;
          });
        })

        .catch((err) => {
          console.log(err);
          toast.error("Request not approved ");
        });
    }

    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* USE THIS MODAL TO REVIEW AS NEEDED */}
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
        Recent Requests
      </Title>
      <hr className="my-4" />
      <Table dataSource={sendRequestWithKeys} columns={columns} className="overflow-x-auto"/>
    </div>
  );
};

export default NewRequest;
