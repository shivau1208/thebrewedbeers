import React, { Suspense, lazy, useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUser, VerifyAuth } from './redux/actions';
import Alert from './components/Alert/Alert';
import Beer from './pages/beer/beer';
import { VerifyAuthService } from './services/loginService';
import CheckoutInit from './pages/payment/checkoutinit';
import DotLoader from './components/spinner/DotLoader';
import ViewAll from './pages/viewall/ViewAll';
import Navbar from './components/navBar/Navbar';


// export const server = 'http://localhost:5000'
export const ImgCDN = 'https://d1ya9wbwk2a32l.cloudfront.net'
const ProductsComp = lazy(()=>import('./pages/products/products'))
const HomeComp = lazy(()=>import('./pages/home/home'))

export default function App() {
  const {authenticated} = useSelector(state=>state.auth)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if(!authenticated){
      VerifyAuthService()
      .then(res=>{
        if(res.status==200){
          dispatch(VerifyAuth('authenticate'));
        }
      })
      .catch(err=>{
        console.error('Failed to verify',err);
        
      })
      .finally(() => {
        setLoading(false);
      });
    }
    const userInfo = localStorage.getItem('userInfo');
    if(userInfo){
      const user = JSON.parse(userInfo);
      dispatch(UpdateUser(user))
    }

  }, [dispatch]);

  
  if (loading) {
    return <div>Loading.....</div>;
  }
  const AuthenticatedRoutes = ()=>(
    <BeerContextFunc>
      <CartContextFunc>
        <FilterContextFunc>
          <Navbar />
          <Routes>
            {/* <Route path='/home' element={<Home />} /> */}
            <Route path='/home' element={<Suspense fallback={<Spinner />}><HomeComp /></Suspense>} />
            <Route path='/beers' element={<Suspense fallback={<Spinner />}><ProductsComp /></Suspense>} />
            <Route path='/dining' element={<DiningFunc />} />
            <Route path='/about' element={<About />} />
            <Route path='/online-payment' element={<Payment />} />
            <Route path='/checkout/init' element={<CheckoutInit />} />
            <Route path='/cartitems' element={<CartComp />} />
            <Route path='/filter' element={<Filter />} />
            <Route path='/beer/:id' element={<Beer />} />
            <Route path='/beers/category/:category' element={<ViewAll />} />
            <Route path='/beers/ingredient/:ingredient' element={<ViewAll />} />
            <Route path='/' element={<Navigate to={"/home"} />} />
            <Route path='*' element={<Page404 />} />
          </Routes>
        </FilterContextFunc>
      </CartContextFunc>
    </BeerContextFunc>
  )
  return (
    <>
      <Routes>
        <Route path='/auth/signin' element={<Signin />} />
        <Route path='/auth/signup' element={<Signup />} />
        <Route path='/*' element={authenticated ? <AuthenticatedRoutes /> : <Navigate to="/auth/signin" />} />
      </Routes>
      <SpeedInsights />
      <Alert />
      <DotLoader />
    </>
  )
}
