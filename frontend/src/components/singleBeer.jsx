import React, { useContext } from 'react';
import '../pages/products/products.css';
import styled from 'styled-components'
import { BeersContext } from '../context/contextapi';


const Button = styled.button`
  border:0;
  outline:0;
  cursor: pointer;
`;
const PlusCartButton = styled.div`
  position:absolute;
  bottom:0rem;
  right:0.5rem;
  cursor:pointer;
`;

export default function SingleBeer({beer}) {
  const {addToCart} = useContext(BeersContext)
  
  return (
    <div className='beer'>
        <div className='beerImage'>
            <img src={beer.strDrinkThumb} className="" alt={beer.strDrink}  />
        </div>
        <div className='beerDetails'>
            <h3>{beer.strDrink}</h3>
            {/* <p>{beer.tagline}</p> */}
            {/* <p>mfg: {beer.first_brewed}</p> */}
            <p>${(beer.idDrink/100).toFixed(2)}</p>
        </div>
        <PlusCartButton className='plusCartButton' onClick={()=>addToCart(beer.idDrink)} >
            <img width='35' src="/plus-large-svgrepo-com.svg" alt="" />
        </PlusCartButton>
    </div>
  )
}
