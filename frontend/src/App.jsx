import React, { useContext, useEffect } from 'react'
import Navbar from './components/navBar/Navbar'
import ListBeers from './pages/home/home'
import { Routes, Route } from 'react-router-dom'
import Products from './pages/products/products'
import Contextapi from './context/contextapi'
import CartComp from './pages/cartComp/cartComp'
import Payment from './pages/payment'
import About from './pages/about/about'


export default function App() {
  
  
  return (
    <div>
      <Contextapi>
        <Navbar />
        <Routes>
          <Route path='/' element={<ListBeers />} />
          <Route path='/home' element={<ListBeers />} />
          <Route path='/beers' element={<Products />} />
          <Route path='/cartitems' element={<CartComp />} />
          <Route path='/about' element={<About />} />
          <Route path='/online-payment' element={<Payment />} />
        </Routes>
      </Contextapi>
    </div>
  )
}
