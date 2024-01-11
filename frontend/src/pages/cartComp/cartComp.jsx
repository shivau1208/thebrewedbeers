import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import './cartComp.css'
import { BeersContext } from '../../context/contextapi';
import Emptycart from './emptyCart';

const MinusCartButton = styled.div`
  position:absolute;
  bottom:0.2rem;
  right:3.5rem;
  cursor:pointer;
  `;
  const PlusCartButton = styled.div`
  position:absolute;
  bottom:0.2rem;
  right:0.8rem;
  cursor:pointer;
`;
const CartLength = styled.span`
    position:absolute;
    top:0.4rem;
    right:3.5rem;
    width: 1.7rem;
    height:1.7rem;
    border-radius:50%;
    background:#353535;
    color:#fff;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:14px;
`;
const CloseButton = styled.div`
    position:absolute;
    top:0.5rem;
    right:0.8rem;
    width: 1.5rem;
    height:1.5rem;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:12px;
    cursor:pointer;
`;
const Header4 = styled.div`
    display:flex;
    justify-content:space-between;
    padding:0.5rem 1rem;
`;
const Header2 = styled.div`
    display:flex;
    justify-content:space-between;
    padding:0.5rem 1rem;
`;

export default function CartComp() {
    const { cartItems, removeFromCart, reduceFromCart, increaseToCart,setShow } = useContext(BeersContext)
    const Total = ()=>{
        let total = cartItems.reduce((acc,curr)=>acc+(curr.quantity*(curr.item.id*curr.item.abv)),0)
        return total;
    }
    
    useEffect(()=>{
        setShow(false)
    },[])

    return (
        <div className='cartPage'>
            {cartItems.length ? 
                <>
                    <div className='modal'>
                        {cartItems.filter((beer, index) => cartItems.findIndex((cartItem) => cartItem.item.id === beer.item.id) === index).map((beer, index) =>
                            <div key={index} className='cartBeer'>
                                <div className='cartBeerImage'>
                                    <img src={beer.item.image_url} alt={beer.item.name} height='150' />
                                </div>
                                <div className='cartBeerDetails'>
                                    <h3>{beer.item.name}</h3>
                                    <p>{beer.item.tagline}</p>
                                    <p>mfg: {beer.item.first_brewed}</p>
                                    <p>Price: $ {(beer.item.id * beer.item.abv).toFixed(2)}</p>
                                </div>
                                <CloseButton onClick={() => removeFromCart(beer.item.id)}>
                                    <img src="/close-svgrepo-com.svg" alt="close" srcSet="" width='30' />
                                </CloseButton>
                                <CartLength aria-disabled>{beer.quantity}</CartLength>
                                <MinusCartButton onClick={() => reduceFromCart(beer.item.id)}>
                                    <img src="/minus-svgrepo-com.svg" alt="" srcSet='' width='30' />
                                </MinusCartButton>
                                <PlusCartButton onClick={() => increaseToCart(beer.item.id)}>
                                    <img src="/plus-svgrepo-com.svg" alt="" width='30' />
                                </PlusCartButton>
                            </div>
                        )}
                    </div>
                    <div className='cartTotal'>
                        <div className='priceDetails'>
                            <p style={{fontSize:'18px',padding:'0.5rem 1rem'}}>Price Details</p>
                            <hr />
                            <Header4><span>{`Price (${cartItems.length} item)`}</span><span>{(cartItems.reduce((acc,curr)=>acc+(curr.quantity*(curr.item.id*curr.item.abv)),0)).toFixed(2)}</span></Header4>
                            <Header4><span>Discount</span><span>5%</span></Header4>
                            <Header4><span>Delivery Charges</span><span>FREE</span></Header4>
                            <hr />
                            <Header2><h3>Total Mount</h3><h3>$ {(Total()-(Total()*5/100)).toFixed(2)}</h3></Header2>
                            <hr />
                            <div>
                                <Link to='/online-payment' >
                                    <button className='placeOrderBtn'>PLACE ORDER</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
                :
                <Emptycart />
            }
        </div>
    )
}
