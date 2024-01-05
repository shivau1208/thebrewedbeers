import React, { useContext, useEffect } from 'react'
import Navbar from './components/navBar/Navbar'
import ListBeers from './pages/home/home'
import { Routes, Route } from 'react-router-dom'
import Products from './pages/products/products'
import Contextapi from './context/contextapi'
import CartComp from './components/cartComp/cartComp'
import Payment from './pages/payment'


export default function App() {
  
  
  return (
    <div>
      <Contextapi>
        <Navbar />
        <Routes>
          <Route path='/' element={<ListBeers />} />
          <Route path='/products' element={<Products />} />
          <Route path='/cartitems' element={<CartComp />} />
          <Route path='/online-payment' element={<Payment />} />
        </Routes>
      </Contextapi>
    </div>
  )
}
