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
        {showRegister ? <Register/> : <Login/>}
        <button className='py-3 underline' onClick={handleFormShow}>{showRegister ? "Already registered? Login now" : "Register now"}</button>
    </div>
  )
}

export default Home