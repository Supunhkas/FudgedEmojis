import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';


const SendEmailModal = ({ visible, onCancel, onOk }) => {
    const [voucherCode, setVoucherCode] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOk = () => {
        // Do something with the voucher code, e.g., send it to an API
        onOk(voucherCode);
    };
    

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleVoucherSubmit = (voucherCode) => {
        // Handle the submitted voucher code (e.g., send it to an API)
        console.log('Submitted Voucher Code:', voucherCode);

        // Close the modal
        setModalVisible(false);
    };

    return (
        <>
            <button onClick={handleOpenModal}>Open Modal</button>
            <Modal
                title="Enter Voucher Code"
                open={modalVisible}
                onCancel={handleCloseModal}
                onOk={handleOk}
                footer={[
                    <Button key="back" onClick={handleCloseModal} >
                        Close
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk} className='button'>
                        Send Email
                    </Button>
                ]}
            >
                <Input
                    placeholder="Enter your voucher code"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                />
            </Modal>
        </>

    );
};

export default SendEmailModal

