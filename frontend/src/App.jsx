import React, { Children, Suspense, lazy, useState } from 'react';
import ListBeers from './pages/home/home';
import { Routes, Route, Navigate } from 'react-router-dom';
import BeerContextFunc from './context/beerContextApi';
import CartComp from './pages/cartComp/cartComp';
import Payment from './pages/payment/payment';
import About from './pages/about/about';
import DiningFunc from './pages/dining/dining';
import Spinner from './components/spinner/spinner';
import Page404 from './components/Error/Page404';
import CartContextFunc from './context/cartContextApi';
import Filter from './components/Filter/Filter';
import {SpeedInsights} from '@vercel/speed-insights/react'
import FilterContextFunc from './context/filterContextApi';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';

export const server = 'https://login-service-xwdp.onrender.com'
const ProductsComp = lazy(()=>import('./pages/products/products'))

// const Protected = async({children})=>{
//   const [authenticated,setAuthenticated] = useState(false);
  // const res = await fetch(`${server}/protected`,{
  //   headers:
  // })
//   return(
//     <>
//     {authenticated && children}
//     </>
//   )
// }


export default function App() {
  
  
  return (
    <>
      <BeerContextFunc>
        <CartContextFunc>
          <FilterContextFunc>
            <Routes>
              <Route path='/*' element={<Page404 />} />
              <Route path='/' element={<Navigate to={"/auth/signin"} />} />
              <Route path='/home' element={<ListBeers />} />
              <Route path='/beers' element={<Suspense  fallback={<Spinner />}><ProductsComp /></Suspense>} />
              <Route path='/dining' element={<DiningFunc />} />
              <Route path='/about' element={<About />} />
              <Route path='/online-payment' element={<Payment />} />
              <Route path='/cartitems' element={<CartComp />} />
              <Route path='/filter' element={<Filter />} />
              <Route path='/auth/signin' element={<Signin />} />
              <Route path='/auth/signup' element={<Signup />} />
            </Routes>
          </FilterContextFunc>
        </CartContextFunc>
      </BeerContextFunc>
      <SpeedInsights />
    </>
  )
}
