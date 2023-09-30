import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const style = {
  color: "black",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

export default function CreateRequestFormModal({ onRequestCreated }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [billNumber, setBillNumber] = useState("");
  const [billScreenshot, setBillScreenshot] = useState(null);
  const [billAmount, setBillAmount] = useState("");
  const [error, setError] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const accessToken = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmLoading(true);
    setError(null);
    // Here, you can handle form submission, e.g., sending data to the server
    const spinBy = localStorage.getItem("name");
    const userEmail = localStorage.getItem("userEmail");
    console.log(userEmail);

    const formData = new FormData();
    formData.append("receiptNo", billNumber);
    formData.append("orderPrice", billAmount);
    formData.append("imgFile", billScreenshot);
    formData.append("spinBy", spinBy);
    formData.append("createdUser", userEmail);

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(`${baseUrl}/request/add`, formData, config)
      .then((res) => {
        setConfirmLoading(false);

        if (res.status === 200) {
          toast.success("Successfully saved request");
          onRequestCreated();
          // Reset the form
          setBillNumber("");
          setBillScreenshot(null);
          setBillAmount("");
          handleClose();
        } else {
          console.error("Error:", res.data);
          setError("An error occurred while saving the request.");
        }
      })
      .catch((error) => {
        setConfirmLoading(false);
        console.error(error);
        toast.error("Request created failed");
        setError("An error occurred while saving the request.");
      });
  };

  const handleBillNumberChange = (e) => {
    setBillNumber(e.target.value);
  };

  const handleBillScreenshotChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setBillScreenshot(file);
  };

  const handleBillAmountChange = (e) => {
    setBillAmount(e.target.value);
  };
  const handleClose = () => {
    console.log("Closing modal");
    setOpen(false);
    setError(null);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="outlined"
        color="success"
        className="fixed bottom-10 inset-x-0"
        style={{
          position: "fixed",
          borderRadius: "999px", // Rounded shape
        }}
      >
        Get New Voucher
      </Button>
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
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
              label="Bill Number"
              variant="outlined"
              fullWidth
              value={billNumber}
              onChange={handleBillNumberChange}
              margin="normal"
              required
            />
            <input
              type="file"
              name="imgFile"
              accept="image/*"
              onChange={handleBillScreenshotChange}
              style={{ display: "none" }}
              id="bill-screenshot"
            />
            <label htmlFor="bill-screenshot">
              <Button variant="outlined" component="span">
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
              required
            />
            <div className="flex justify-between items-center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={confirmLoading}
              >
                {" "}
                {confirmLoading ? "Uploading" : "Submit"}
              </Button>
              <Button onClick={handleClose} variant="contained" color="error">
                {" "}
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
