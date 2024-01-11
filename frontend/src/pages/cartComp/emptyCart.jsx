import React, { useContext } from 'react'
import { BeersContext } from '../../context/contextapi'

export default function Emptycart() {
    const {cartItems} = useContext(BeersContext)
  return (
    <>
        <div className='emptyCart'>
            <img src="/cheers.gif" alt="" />
            <h4>Empty Cart</h4>
        </div>
    </>
  )
}
