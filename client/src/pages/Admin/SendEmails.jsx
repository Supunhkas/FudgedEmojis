import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import SendEmailModal from "../../components/SendEmailModal";
import ReviewModal from "../../components/ReviewModel";
const SendEmails = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const accessToken = localStorage.getItem("token");

  const [sendRequest, setSendRequest] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [voucherCode, setVoucherCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestData, setSelectedRequestData] = useState(null);

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
        const color = record.voucherType === "Amazon" ? "green" : "geekblue";

        return <Tag color={color}>{record.voucherType}</Tag>;
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
          <a onClick={() => handleReview(record._id)}> Review </a>
          <a onClick={() => handleSend(record._id)}> Send email </a>
        </Space>
      ),
    },
  ];

  const handleCancel = () => {
    setSelectedRequestId(null);
    setIsModalVisible(false);
  };

  const handleSend = (id) => {
    setSelectedRequestId(id);
    setIsModalVisible(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleModalCancel = () => {
    setIsModalOpen(false);
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
    setIsModalOpen(false);
    setIsModalVisible(true);
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

        setSendRequest((prevRequest) => {
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

  const handleSendMail = (id, voucherCode) => {
    setSelectedRequestId(id);
    let requestId = id;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const selectedRequest = sendRequest.find((item) => item._id === id);
    if (selectedRequest) {
      const { receiptNo, spinnerResult, voucherType, remarks, createdUser } =
        selectedRequest;
      const data = {
        to: createdUser,
        subject: "Your Voucher Code",
        receiptNo,
        spinnerResult,
        voucherType,
        voucherCode,
        remarks,
      };
      axios
        .post(`${baseUrl}/request/email/${requestId}`, data, config)
        .then((res) => {
         
          const data = {
            status: 5,
            mailSent: true,
          };
          axios
            .put(`${baseUrl}/request/update/${requestId}`, data, config)
            .then((res) => {
              toast.success("Email send successfully");
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
          toast.error("Email sent failed");
        })
        .finally(() => {
          setIsModalVisible(false);
        });
    }
  };

  return (
    <div>
      <Title level={3} className="text-center my-3">
        Send Vouchers to the Clients
      </Title>
      <hr className="my-4" />
      <Table dataSource={sendRequestWithKeys} columns={columns} className="overflow-x-auto"/>
      {/* USE THIS MODAL TO SEND EMAILS AS NEEDED */}

      {isModalVisible && (
        <SendEmailModal
          visible={isModalVisible}
          onCancel={handleCancel}
          onOk={(voucherCode) => handleSendMail(selectedRequestId, voucherCode)}
          voucherCode={voucherCode}
          setVoucherCode={setVoucherCode}
        />
      )}
      {isModalOpen && (
        <ReviewModal
          data={selectedRequestData}
          isOpen={isModalOpen}
          onOk={handleOk}
          onCancel={handleModalCancel}
          onReject={handleReject}
        />
      )}
    </div>
  );
};

export default SendEmails;
