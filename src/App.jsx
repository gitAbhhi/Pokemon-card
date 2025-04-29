import { useContext, useEffect, useState } from 'react'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './component/Navbar'
import Footerpage from './component/Footer'
import Productdetail from './pages/Productdetail'
import Login from './pages/Login'
import Home from './pages/Home'
import { StoreContext } from './component/context/StoreContext'
import Cart from './pages/Cart'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import ProtectedRoute from './component/ProtectedRoute'



function App() {
  const { token } = useContext(StoreContext);
  const navigate = useNavigate();
  return (
<>
      <ToastContainer />
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Productdetail />} />
        </Route>
      </Routes>
    </>

  )
}

export default App
