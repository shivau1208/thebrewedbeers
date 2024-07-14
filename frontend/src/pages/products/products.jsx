import './products.css'
import React, { useContext, useEffect, useState } from 'react'
import { BeersContext, useBeerContextApi } from '../../context/beerContextApi';
import SingleBeer from '../../components/singleBeer';
import Nodatafound from '../../components/Error/Nodatafound';
import Filter from '../../components/Filter/Filter';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navBar/Navbar';
import SortFilter from '../../components/sortfilter/SortFilter';

export default function Products() {
    const {data,products,setSearchComp,setCartComp} = useBeerContextApi();


    useEffect(() => {
        setSearchComp(true);
        setCartComp(true);
      }, []);
    return (
        <>
            <Navbar />
            <SortFilter />
            <div className='productsFilter'>
                {products !== null && products.length ? <div className='beerProducts'>
                    {products.map((beer, index) =>
                        <SingleBeer key={index} beer={beer} />
                    )}
                </div> : <Nodatafound /> }
            </div>
        </>
    )
}