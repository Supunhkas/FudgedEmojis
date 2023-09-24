import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const TopNavBar = () => {
    const navigate = useNavigate()
    const navigateBack = ()=>{
        navigate('../')
    }
    const styles = {
        padding:'10px'
    }
  return (
    <div style={styles}>
        <Button
        onClick={navigateBack}>
        <ArrowBackIosIcon color='dark'/>
        </Button>
        
    </div>
  )
}

export default TopNavBar