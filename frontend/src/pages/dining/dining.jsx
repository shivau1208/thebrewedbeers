import React, { useEffect } from 'react';
import './dining.css';
import Navbar from '../../components/navBar/Navbar';
import { useBeerContextApi } from '../../context/beerContextApi';

export default function Dining() {
  const {setSearchComp,setCartComp} = useBeerContextApi();
  useEffect(() => {
    setSearchComp(false);
    setCartComp(false)
  }, []);
  return (
    <>
      <Navbar />
      <div className='diningContainer'>
        <h1>
          <span></span>
        </h1>
        <div className='load'></div>
      </div>
    </>
  );
}
