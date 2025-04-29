import { useContext, useEffect, useState } from 'react'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './component/Navbar'
import Footerpage from './component/Footer'
import Productdetail from './pages/Productdetail'
import Login from './pages/Login'
import Home from './pages/Home'



function App() {
  return (
<>
      <Routes>
          <Route path="/" element={<Home />} />
      </Routes>
    </>

  )
}

export default App
