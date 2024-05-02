import React, { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

const Home = () => {
    const [showRegister , setShowRegister] = useState(false);
    const handleFormShow = () => {
        if(showRegister)
            setShowRegister(false);
        else 
            setShowRegister(true);
    }
  return (
    <div className="grid bg-white rounded-lg m-auto w-96">
      <Routes>
            
          </Routes>
    </div>
  )
}

export default Home