import React, { useContext } from 'react'
import { BeersContext } from '../../context/beerContextApi'
import { useCartContextApi } from '../../context/cartContextApi'

export default function Emptycart() {
    const {cartItems} = useCartContextApi();
  return (
    <>
        <div className='emptyCart'>
            <img src="/cheers.gif" alt="" />
            <h4>Empty Cart</h4>
        </div>
    </>
  )
}
