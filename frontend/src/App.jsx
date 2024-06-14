import React from 'react'
import Navbar from './components/navBar/Navbar'
import ListBeers from './pages/home/home'
import { Routes, Route, Navigate } from 'react-router-dom'
import Products from './pages/products/products'
import Contextapi from './context/contextapi'
import CartComp from './pages/cartComp/cartComp'
import Payment from './pages/payment/payment'
import About from './pages/about/about'
import DiningFunc from './pages/dining/dining'


export default function App() {
  
  
  return (
    <div>
      <Contextapi>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to={"/home"} />} />
          <Route path='/home' element={<ListBeers />} />
          <Route path='/beers' element={<Products />} />
          <Route path='/dining' element={<DiningFunc />} />
          <Route path='/cartitems' element={<CartComp />} />
          <Route path='/about' element={<About />} />
          <Route path='/online-payment' element={<Payment />} />
        </Routes>
      </Contextapi>
    </div>
  )
}
