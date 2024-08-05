import React, { Suspense, lazy, useEffect, useState } from 'react';
import ListBeers from './pages/home/home';
import { Routes, Route, Navigate, json } from 'react-router-dom';
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
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { VerifyAuth } from './redux/actions';
import Alert from './components/Alert/Alert';


// export const server = 'https://login-service-xwdp.onrender.com'
export const server = 'http://localhost:5000'
const ProductsComp = lazy(()=>import('./pages/products/products'))

export default function App() {
  const {authenticated} = useSelector(state=>state.auth)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // const cid = Cookies.get('cid');
  useEffect(() => {
    if(!authenticated){
      fetch(`${server}/protected`,{
        headers:{
          'content-type':'application/json',
        },
        credentials:'include',
      })
      .then(res=>{
        if(res.status==200){
          dispatch(VerifyAuth('authenticate'));
        }
      })
      .catch(err=>{
        console.log(err)
      })
      .finally(() => {
        setLoading(false);
      });
    }
  }, [dispatch]);

  if (loading) {
    return <div>Loading.....</div>;
  }
  const AuthenticatedRoutes = ()=>(
    <BeerContextFunc>
      <CartContextFunc>
        <FilterContextFunc>
          <Routes>
            <Route path='/home' element={<ListBeers />} />
            <Route path='/beers' element={<Suspense fallback={<Spinner />}><ProductsComp /></Suspense>} />
            <Route path='/dining' element={<DiningFunc />} />
            <Route path='/about' element={<About />} />
            <Route path='/online-payment' element={<Payment />} />
            <Route path='/cartitems' element={<CartComp />} />
            <Route path='/filter' element={<Filter />} />
            <Route path='*' element={<Page404 />} />
          </Routes>
        </FilterContextFunc>
      </CartContextFunc>
    </BeerContextFunc>
  )
  return (
    <>
      <Routes>
        {/* <Route path='/' element={<Navigate to="/auth/signin" />} /> */}
        <Route path='/auth/signin' element={<Signin />} />
        <Route path='/auth/signup' element={<Signup />} />
        <Route path='/*' element={authenticated ? <AuthenticatedRoutes /> : <Navigate to="/auth/signin" />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
      <SpeedInsights />
      <Alert />
    </>
  )
}
