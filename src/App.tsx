import { useEffect, useState } from 'react'
import './App.css'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import Nav from './components/Nav'
import { Outlet, useNavigate, useLocation } from "react-router-dom";

function App() {

  const navigate = useNavigate();
  let location = useLocation();

  useEffect(()=>{
    if (location.pathname === '/'){
      navigate('/reports')
    }
  },[])

  return (
    <div className='h-screen' >
      <SignedIn>
        <div className='bg-white min-h-screen w-screen flex'>
          <Nav/>
          <div className='w-full' id="detail">
            <Outlet />
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn/>
      </SignedOut>
    </div>
  )
}

export default App
