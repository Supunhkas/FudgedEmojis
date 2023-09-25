import { Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Request = ({ id, status }) => {
  const navigate = useNavigate()
  const handleSpinClick = (id)=>{
    navigate(`/spin?id=${id}`); 
  }
  return (
    <div className='text-black p-5 shadow'>
      <Typography variant='h6' >
        Title
      </Typography>
      <p>Simple Description Goes Here</p>
      {status === 'underReview' ? (
        <p className='text-red-500'>Under Review</p>
      ) : status === 'approved' ? (
        <div className='flex justify-between items-center'>
          <p className='text-green-500'>Approved</p>
          <Button variant="contained" color='success' onClick={() =>handleSpinClick(id)} style={{
            borderRadius: '999px',
          }}>Spin Now</Button>
        </div>
      ) : null}
      <p className='text-grey text-xs'>2022-04-95</p>
    </div>
  )
}

export default Request