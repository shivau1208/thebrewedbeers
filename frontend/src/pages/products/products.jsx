import './products.css'
import React, { useContext, useEffect, useState } from 'react'
import { BeersContext, useBeerContextApi } from '../../context/beerContextApi';
import SingleBeer from '../../components/singleBeer';
import Nodatafound from '../../components/Error/Nodatafound';
import Filter from '../../components/Filter/Filter';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navBar/Navbar';
import SortFilter from '../../components/sortfilter/SortFilter';
import DesktopFilter from '../../components/Filter/DesktopFilter';
import styled from 'styled-components';

const ProductsFilter = styled.div`
    position: relative;
    display: flex;
    margin: 10px 8%;
`

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
            {products !== null && products.length ?  <div className='productsFilter'>
                <DesktopFilter />
                <div className='beerProducts'>
                    {products.slice().sort(() => Math.random() - 0.5).map((beer, index) =>
                        <SingleBeer key={index} beer={beer} />
                    )}
                </div> 
            </div> : <Nodatafound /> }
        </>
    )
}