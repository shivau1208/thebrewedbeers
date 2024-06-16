import './products.css'
import React, { useContext, useEffect, useState } from 'react'
import { BeersContext } from '../../context/contextapi';
import SingleBeer from '../../components/singleBeer';
import Nodatafound from '../../components/Error/Nodatafound';
import Filter from '../../components/Filter/Filter';

export default function Products() {
    const {data,setSearchComp,filter,setFilter} = useContext(BeersContext);
    
    useEffect(()=>{
        setSearchComp(true)
    },[])

    return (
        <>
            <div className='filterBtn'>
                <button className='btn' onClick={()=>setFilter(!filter)} >Filter</button>
            </div>
            <div className='products-Filter'>
                {data !==null ? <div className='beerProducts'>
                    {data.map((beer, index) =>
                        <SingleBeer key={index} beer={beer} />
                    )}
                </div> : <Nodatafound /> }
                {filter && <Filter />}
            </div>
        </>
    )
}