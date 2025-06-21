import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CartComp from '@/pages/cart/cart';
import Payment from '@/pages/payment/payment';
import About from '@/pages/about/about';
import DiningFunc from '@/pages/dining/dining';
import Spinner from '@/components/loaders/spinner';
import Page404 from '@/components/Error/Page404';
import CartContextFunc from '@/context/cartContextApi';
import Filter from '@/components/Filter/Filter';
import {SpeedInsights} from '@vercel/speed-insights/react'
import FilterContextFunc from '@/context/filterContextApi';
import Signin from '@/pages/auth/Signin';
import Signup from '@/pages/auth/Signup';
import Alert from '@/components/Alert/Alert';
import Beer from '@/pages/beer/beer';
import DotLoader from '@/components/loaders/DotLoader';
import ViewAll from '@/pages/viewall/ViewAll';
import Navbar from '@/components/navBar/Navbar';
import BeerContextFunc from '@/context/beerContextApi';

export const server = 'https://login-service.netlify.app/.netlify/functions/api'
// export const server = import.meta.env.VITE_SERVER_URL;
// export const server = 'http://localhost:5000/.netlify/functions/api'

export const ImgCDN = 'https://d1ya9wbwk2a32l.cloudfront.net'

const SearchProductComp = lazy(()=>import('./components/searchComponent/SearchedProducts'))
const ProductsComp = lazy(()=>import('./pages/products/products'))
const HomeComp = lazy(()=>import('./pages/home/home'))


export default function App() {
  
  return (
    <>
      <BeerContextFunc>
        <CartContextFunc>
          <FilterContextFunc>
            <Routes>
              <Route path='/auth/signin' element={<Signin />} />
              <Route path='/auth/signup' element={<Signup />} />
              <Route
                path='*'
                element={
                  <>
                    <Navbar />
                    <Routes>
                      <Route path='/home' element={<Suspense fallback={<Spinner />}><HomeComp /></Suspense>} />
                      <Route path='/beers' element={<Suspense fallback={<Spinner />}><ProductsComp /></Suspense>} />
                      <Route path='/search' element={<Suspense fallback={<Spinner />}><SearchProductComp /></Suspense>} />
                      <Route path='/dining' element={<DiningFunc />} />
                      <Route path='/about' element={<About />} />
                      <Route path='/cartitems' element={<CartComp />} />
                      <Route path='/filter' element={<Filter />} />
                      <Route path='/beer/:id' element={<Beer />} />
                      <Route path='/beers/category/:category' element={<ViewAll />} />
                      <Route path='/beers/ingredient/:ingredient' element={<ViewAll />} />
                      <Route path='/online-payment' element={<Payment />} />
                      <Route path='/' element={<Navigate to={"/home"} />} />
                      <Route path='/*' element={<Page404 />} />
                    </Routes>
                  </>
                }
              />
            </Routes>
          </FilterContextFunc>
        </CartContextFunc>
      </BeerContextFunc>
      
      <SpeedInsights />
      <Alert />
      <DotLoader />
    </>
  )
}
