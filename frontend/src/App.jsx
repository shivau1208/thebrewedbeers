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


export const server = 'https://login-service-xwdp.onrender.com'
// export const server = 'http://localhost:5000'
const ProductsComp = lazy(()=>import('./pages/products/products'))

const cid = Cookies.get('cid');
export default function App() {
  const {authenticated} = useSelector(state=>state.auth)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  console.log(cid);
  useEffect(() => {
    if(!authenticated){
      fetch(`${server}/protected`,{
        headers:{
          'content-type':'application/json',
          'Authorization':cid,
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
  return (
    <>
      <BeerContextFunc>
        <CartContextFunc>
          <FilterContextFunc>
            <Routes>
              <Route path='/*' element={<Page404 />} />
              <Route path='/' element={<Navigate to={"/auth/signin"} />} />
              <Route path='/home' element={authenticated ? <ListBeers /> : <Navigate to={"/auth/signin"} />} />
              <Route path='/beers' element={authenticated ? <Suspense fallback={<Spinner />}><ProductsComp /></Suspense> : <Signin />} />
              <Route path='/dining' element={authenticated ? <DiningFunc /> : <Signin />} />
              <Route path='/about' element={authenticated ? <About /> : <Signin />} />
              <Route path='/online-payment' element={authenticated ? <Payment /> : <Signin />} />
              <Route path='/cartitems' element={authenticated ? <CartComp /> : <Signin />} />
              <Route path='/filter' element={authenticated ? <Filter /> : <Signin />} />
              <Route path='/auth/signin' element={<Signin />} />
              <Route path='/auth/signup' element={<Signup />} />
            </Routes>
          </FilterContextFunc>
        </CartContextFunc>
      </BeerContextFunc>
      <SpeedInsights />
      <Alert />
    </>
  )
}
