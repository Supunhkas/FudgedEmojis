import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';


const SendEmailModal = ({ visible, onCancel, onOk,voucherCode, setVoucherCode }) => {
    // const [voucherCode, setVoucherCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleOk = () => {
        onOk(voucherCode);
      };

    return (
        <>
            {/* <button onClick={handleOpenModal}>Open Modal</button> */}
            <Modal
                title="Enter Voucher Code"
                open={visible}
                onCancel={onCancel}
                onOk={onOk}
                footer={[
                    <Button key="back" onClick={onCancel} >
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

