import React, { useContext, useEffect, useState } from 'react'
<<<<<<< HEAD
import {Link} from 'react-router-dom'
=======
import {Link, useNavigate} from 'react-router-dom'
>>>>>>> 885121f (Added filter feature to Beers route)
import styled from 'styled-components';
import './cartComp.css'
import { BeersContext, useBeerContextApi } from '../../context/beerContextApi';
import Emptycart from './emptyCart';
import { useCartContextApi } from '../../context/cartContextApi';
<<<<<<< HEAD
=======
import Navbar from '../../components/navBar/Navbar';
>>>>>>> 885121f (Added filter feature to Beers route)

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
    padding:0.4rem 1rem;
`;
const Header2 = styled.p`
    display: flex;
    padding: 0.3rem;
    font-size: 24px;
`;
<<<<<<< HEAD

export default function CartComp() {
    const { setSearchComp } = useBeerContextApi();
    const {cartItems, removeFromCart, reduceFromCart, increaseToCart} = useCartContextApi()
=======
const CartBackBtnParent = styled.div`
  height:50px;
  display:flex;
  align-items:center;
  justify-content:start
`
const CartBackBtn = styled.button`
  border: none;
  outline: none;
  padding: 0.7rem 0.6rem;
  margin-right: 1rem;
  background-color: transparent;
  height: 100%;
  
`
const CartHeaderSpan = styled.span`

`
export default function CartComp() {
    const { setSearchComp,setCartComp } = useBeerContextApi();
    const {cartItems, removeFromCart, reduceFromCart, increaseToCart} = useCartContextApi()
    const navigate = useNavigate();
>>>>>>> 885121f (Added filter feature to Beers route)
    const Total = ()=>{
        let total = cartItems.reduce((acc,curr)=>acc+(curr.quantity*(curr.item.idDrink/100)),0)
        return total;
    }
    
    useEffect(()=>{
        setSearchComp(false)
<<<<<<< HEAD
    },[])

    return (
        <div className='cartPage'>
            {cartItems.length ? 
                <>
                    <div className='modal'>
                        {cartItems.filter((beer, index) => cartItems.findIndex((cartItem) => cartItem.item.idDrink === beer.item.idDrink) === index).map((beer, index) =>
                            <div key={index} className='cartBeer'>
                                <div className='cartBeerImage'>
                                    <img src={beer.item.strDrinkThumb} alt={beer.item.strDrink} height='150' />
                                </div>
                                <div className='cartBeerDetails'>
                                    <h3>{beer.item.strDrink}</h3>
                                    {/* <p>{beer.item.tagline}</p>
                                    <p>mfg: {beer.item.first_brewed}</p> */}
                                    <p>Price: $ {(beer.item.idDrink/100).toFixed(2)}</p>
                                </div>
                                <CloseButton onClick={() => removeFromCart(beer.item.idDrink)}>
                                    <img src="/close-svgrepo-com.svg" alt="close" srcSet="" width='30' />
                                </CloseButton>
                                <CartLength aria-disabled>{beer.quantity}</CartLength>
                                <MinusCartButton onClick={() => reduceFromCart(beer.item.idDrink)}>
                                    <img src="/minus-svgrepo-com.svg" alt="" srcSet='' width='30' />
                                </MinusCartButton>
                                <PlusCartButton onClick={() => increaseToCart(beer.item.idDrink)}>
                                    <img src="/plus-svgrepo-com.svg" alt="" width='30' />
                                </PlusCartButton>
                            </div>
                        )}
                    </div>
                    <div className='cartTotal'>
                        <div className='priceDetails'>
                            <p>Price Details</p>
                            <hr />
                            <Header4><span>{`Price (${cartItems.length} item)`}</span><span>{(cartItems.reduce((acc,curr)=>acc+(curr.quantity*(curr.item.idDrink/100)),0)).toFixed(2)}</span></Header4>
                            <Header4><span>Discount</span><span>5%</span></Header4>
                            <Header4><span>Delivery Charges</span><span>FREE</span></Header4>
                            <hr />
                            <div className='totalFooter'>
                                <Header2>${(Total()-(Total()*5/100)).toFixed(2)}</Header2>
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
=======
        setCartComp(false)
    },[])

    return (
      <>
        <CartBackBtnParent>
          <CartBackBtn onClick={() => navigate(-1)}>
            <img src="/back-btn.svg" alt="go back" srcSet="" />
          </CartBackBtn>
          <CartHeaderSpan>My Cart</CartHeaderSpan>
        </CartBackBtnParent>
        <div className="cartPage">
          {cartItems.length ? (
            <>
              <div className="modal">
                {cartItems
                  .filter((beer, index) => cartItems.findIndex((cartItem) => cartItem.item.idDrink === beer.item.idDrink) === index)
                  .map((beer, index) => (
                    <div key={index} className="cartBeer">
                      <div className="cartBeerImage">
                        <img src={beer.item.strDrinkThumb} className="responsive" alt={beer.item.strDrink} height="100%" />
                      </div>
                      <div className="cartBeerDetails">
                        <h3>{beer.item.strDrink}</h3>
                        <p>{beer?.item?.strAlcoholic}</p>
                        {/* <p>mfg: {beer.item.first_brewed}</p> */}
                        <p>Price: $ {(beer.item.idDrink / 100).toFixed(2)}</p>
                      </div>
                      <CloseButton onClick={() => removeFromCart(beer.item.idDrink)}>
                        <img src="/close-svgrepo-com.svg" alt="close" srcSet="" width="30" />
                      </CloseButton>
                      <CartLength aria-disabled>{beer.quantity}</CartLength>
                      <MinusCartButton onClick={() => reduceFromCart(beer.item.idDrink)}>
                        <img src="/minus-svgrepo-com.svg" alt="" srcSet="" width="30" />
                      </MinusCartButton>
                      <PlusCartButton onClick={() => increaseToCart(beer.item.idDrink)}>
                        <img src="/plus-svgrepo-com.svg" alt="" width="30" />
                      </PlusCartButton>
                    </div>
                  ))}
              </div>
              <div className="cartTotal">
                <div className="priceDetails">
                  <p>Price Details</p>
                  <hr />
                  <Header4>
                    <span>{`Price (${cartItems.length} item)`}</span>
                    <span>{cartItems.reduce((acc, curr) => acc + curr.quantity * (curr.item.idDrink / 100), 0).toFixed(2)}</span>
                  </Header4>
                  <Header4>
                    <span>Discount</span>
                    <span>5%</span>
                  </Header4>
                  <Header4>
                    <span>Delivery Charges</span>
                    <span>FREE</span>
                  </Header4>
                  <hr />
                  <div className="totalFooter">
                    <Header2>${(Total() - (Total() * 5) / 100).toFixed(2)}</Header2>
                    <Link to="/online-payment">
                      <button className="placeOrderBtn">PLACE ORDER</button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Emptycart />
          )}
        </div>
      </>
    );
>>>>>>> 885121f (Added filter feature to Beers route)
}
