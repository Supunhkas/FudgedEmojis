import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Request = ({ id, status, receipt, name, date }) => {
  const navigate = useNavigate();
  const formattedDate = moment(date).format("DD-MMM-YYYY, h-MM a ");

  const handleSpinClick = (id) => {
    navigate(`/spin?id=${id}`);
  };  
  return (
    <div className="text-black p-5 shadow">
      <Typography variant="h6">Receipt No: {receipt}</Typography>
      <p>User Name: {name} </p>
      {status === 0 ? (
        <p className="text-red-500">Under Review</p>
      ) : status === 1 ? (
        <div className="flex justify-between items-center">
          <p className="text-green-500">Approved</p>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleSpinClick(id)}
            style={{
              borderRadius: "999px",
            }}
          >
            Spin Now
          </Button>
        </div>
      ) : null}
      <p className="text-grey text-xs">{formattedDate}</p>
    </div>
  );
};

export default Request;
