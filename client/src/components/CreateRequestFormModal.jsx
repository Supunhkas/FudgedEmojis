import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

const style = {
    color: 'black',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
};

export default function CreateRequestFormModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [billNumber, setBillNumber] = useState('');
    const [billScreenshot, setBillScreenshot] = useState(null);
    const [billAmount, setBillAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you can handle form submission, e.g., sending data to the server
        console.log('Bill Number:', billNumber);
        console.log('Bill Screenshot:', billScreenshot);
        console.log('Bill Amount:', billAmount);
    };

    const handleBillNumberChange = (e) => {
        setBillNumber(e.target.value);
    };

    const handleBillScreenshotChange = (e) => {
        setBillScreenshot(e.target.files[0]);
    };

    const handleBillAmountChange = (e) => {
        setBillAmount(e.target.value);
    };

    return (
        <div>
            <Button onClick={handleOpen} variant="outlined" color='success' className='fixed bottom-10 inset-x-0'
                style={{
                    position: 'fixed',
                    borderRadius: '999px', // Rounded shape
                }}>Get New Voucher</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Submit Your Bill Details
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Bill Number"
                            variant="outlined"
                            fullWidth
                            value={billNumber}
                            onChange={handleBillNumberChange}
                            margin="normal"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleBillScreenshotChange}
                            style={{ display: 'none' }}
                            id="bill-screenshot"
                        />
                        <label htmlFor="bill-screenshot">
                            <Button
                                variant="outlined"
                                component="span"
                            >
                                Upload Bill Screenshot
                            </Button>
                        </label>
                        {billScreenshot && <p>Selected: {billScreenshot.name}</p>}
                        <TextField
                            label="Bill Amount"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={billAmount}
                            onChange={handleBillAmountChange}
                            margin="normal"
                        />
                        <div className='flex justify-between items-center'>
                            <Button type="submit" variant="contained" color="primary"> Submit</Button>
                            <Button onClick={handleClose} variant="contained" color="error"> Cancel</Button>
                        </div>


                    </form>
                </Box>
            </Modal>
        </div>
    );
}
