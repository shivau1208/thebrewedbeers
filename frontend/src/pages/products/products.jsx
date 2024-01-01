import './products.css'
import React, { useContext, useEffect, useState } from 'react'
import { BeersContext } from '../../context/contextapi';
import SingleBeer from '../../components/singleBeer';

export default function Products() {
    const {data,setShow} = useContext(BeersContext)
    useEffect(()=>{
        setShow(true)
    },[])

    return (
        <div>
            <div className='beerProducts'>
                {data.map((beer, index) =>
                    <SingleBeer key={index} beer={beer} />
                )}
            </div>
        </div>
    )
}