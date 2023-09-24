import { useState } from 'react'
import './App.css'
import SignIn from './pages/SignIn'
import { Router, Routes, BrowserRouter, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import UserDashboard from './pages/UserDashboard'
import SpinWheel from './pages/SpinWheel'
import AdminLayout from './Layout/Layout'
import NewRequest from './pages/Admin/NewRequest'
import Completed from './pages/Admin/Completed'
import Rejected from './pages/Admin/Rejected'
import SendEmails from './pages/Admin/SendEmails'
import WaitingForSpin from './pages/Admin/WaitingForSpin'


function App() {

  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path='/login' element={<SignIn />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/' element={<UserDashboard />} />
          <Route path='/spin' element={<SpinWheel />} />

          <Route path='admin' element={<AdminLayout />}>
            <Route path='new' element={<NewRequest />} />
            <Route path='completed' element={<Completed />} />
            <Route path='rejected' element={<Rejected />} />
            <Route path='send' element={<SendEmails />} />
            <Route path='waiting' element={<WaitingForSpin/>}/>


          </Route>


        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
