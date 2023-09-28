import React, { useState } from 'react';
import { Button, Modal, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import moment from 'moment';

const ReviewModal = ({ data, isOpen, onOk, onCancel, onReject }) => {
    const { Text } = Typography;
    const [loading, setLoading] = useState(false);
    const formattedDate = moment(data.createdAt).format("DD-MMM-YYYY");


    return (
        <>
            {/* <Button type="primary" onClick={showModal}>Review</Button> */}
            <Modal title="Review Details" open={isOpen} onOk={onOk} onCancel={onCancel}
                footer={[
                    <Button key="back" onClick={onCancel} >
                        Close
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={onOk} className='button'>
                        Approve
                    </Button>,
                    <Button
                        key="link"
                        href="#"
                        type="primary"
                        loading={loading}
                        onClick={() => onReject(data._id)}
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
                            <img src={data.imgUrl} className='w-full h-full object-contain' />
                        </div>
                    </div>
                    <div className="details w-2/4 p-4">
                        <Title level={4}> Name</Title>
                        <Text>{data.spinBy}</Text>
                        <br />
                        <Title level={5}>Price</Title>
                        <Text>{data.orderPrice}</Text>
                        <br />
                        <Title level={5}>Date</Title>
                        <Text>{formattedDate}</Text>

                        <Title level={5}>Voucher Type</Title>
                        <Text>{data.voucherType}</Text>

                        <Title level={5}>Result</Title>
                        <Text>{data.spinnerResult}%</Text>
                    </div>
                </div>
                <div>

                </div>


            </Modal>
        </>
    );
};
export default ReviewModal;