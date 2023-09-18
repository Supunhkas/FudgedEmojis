
import React from 'react'
import MenuAppBar from '../components/AppBar'
import { Button, Typography } from '@mui/material'
import Request from '../components/Request'
import CreateRequestFormModal from '../components/CreateRequestFormModal'

const UserDashboard = () => {
    return (
        <div>
            <MenuAppBar />
            <Typography variant="h6" gutterBottom color={'black'} sx={
                {
                    textAlign: 'center',
                    marginTop: '1rem'
                }
            }>
                Submitted Requests
            </Typography>

            <div className=''>
                <Request status={'underReview'}/>
                <Request status={'approved'}/>
            </div>
            <CreateRequestFormModal/>


                

        </div>
    )
}

export default UserDashboard