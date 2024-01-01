import React, { useContext, useEffect } from 'react'
import Navbar from './components/navBar/Navbar'
import ListBeers from './components/ListBeers/ListBeers'
import { Routes, Route } from 'react-router-dom'
import Products from './pages/products/products'
import Contextapi, { BeersContext } from './context/contextapi'
import CartComp from './components/cartComp/cartComp'


export default function App() {
  
  return (
    <div>
      <Contextapi>
        <Navbar />
        <Routes>
          <Route path='/' element={<ListBeers />} />
          <Route path='/products' element={<Products />} />
          <Route path='/cartitems' element={<CartComp />} />
        </Routes>
      </Contextapi>
    </div>
  )
}
