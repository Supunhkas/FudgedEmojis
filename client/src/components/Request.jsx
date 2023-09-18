import { Button, Typography } from '@mui/material'
import React from 'react'

const Request = ({ status }) => {
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
          <Button variant="contained" color='success' style={{
            borderRadius: '999px',
          }}>Spin Now</Button>
        </div>
      ) : null}
      <p className='text-grey text-xs'>2022-04-95</p>
    </div>
  )
}

export default Request