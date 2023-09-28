import React, { useState } from 'react';
import { Button, Modal, Typography } from 'antd';
import Title from 'antd/es/typography/Title';

const ReviewModal = ({ data }) => {
    const { Text } = Typography;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleReject = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>Review</Button>
            <Modal title="Review Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel} >
                        Close
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk} className='button'>
                        Approve
                    </Button>,
                    <Button
                        key="link"
                        href="#"
                        type="primary"
                        loading={loading}
                        onClick={handleReject}
                        danger
                    >
                        Reject
                    </Button>,
                ]}

            >
                <div className="flex justify-between">
                    <div className='w-2/4 p-4'>
                        <Title level={5}>Screenshot</Title>
                        <div className='' style={{ width: '200px' }}>
                            <img src={data.image} className='w-full h-full object-contain' />
                        </div>
                    </div>
                    <div className="details w-2/4 p-4">
                        <Title level={4}>Full Name</Title>
                        <Text>{data.name}</Text>
                        <br />
                        <Title level={5}>Price</Title>
                        <Text>{data.price}</Text>
                        <br />
                        <Title level={5}>Date</Title>
                        <Text>{data.date}</Text>

                        <Title level={5}>Voucher Type</Title>
                        <Text>{data.voucher}</Text>

                        <Title level={5}>Result</Title>
                        <Text>{data.result}</Text>
                    </div>
                </div>
                <div>

                </div>


            </Modal>
        </>
    );
};
export default ReviewModal;