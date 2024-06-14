import React, { useContext } from 'react'
import styled from 'styled-components'
import { BeersContext } from '../context/contextapi';


const Button = styled.button`
  border:0;
  outline:0;
  cursor: pointer;
`;
const PlusCartButton = styled.div`
  position:absolute;
  bottom:0.5rem;
  right:0.5rem;
  cursor:pointer;
`;

export default function SingleBeer({beer}) {
  const {addToCart} = useContext(BeersContext)
  
  return (
    <div className='beer'>
        <div className='beerImage'>
            <img src={beer.strDrinkThumb} alt={beer.strDrink} height='150' />
        </div>
        <div className='beerDetails'>
            <h3>{beer.strDrink}</h3>
            {/* <p>{beer.tagline}</p> */}
            {/* <p>mfg: {beer.first_brewed}</p> */}
            <p>Price: ${(beer.idDrink/100).toFixed(2)}</p>
        </div>
        <PlusCartButton className='plusCartButton' onClick={()=>addToCart(beer.idDrink)} >
            <img width='35' src="/plus-large-svgrepo-com.svg" alt="" />
        </PlusCartButton>
    </div>
  )
}
