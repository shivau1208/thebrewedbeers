import React, { useContext, useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styled from 'styled-components';
import './cartComp.css'
import { BeersContext, useBeerContextApi } from '../../context/beerContextApi';
import Emptycart from './emptyCart';
import { useCartContextApi } from '../../context/cartContextApi';
import Navbar from '../../components/navBar/Navbar';

const MinusCartButton = styled.div`
  position:absolute;
  bottom:0rem;
  right:1.5rem;
  cursor:pointer;
  `;
const PlusCartButton = styled.div`
  position:absolute;
  bottom:0rem;
  right:0rem;
  cursor:pointer;
`;
const CartLength = styled.span`
  position: absolute;
  top: 0.3rem;
  right: 1.7rem;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: #353535;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`;
const CloseButton = styled.div`
  position: absolute;
  top: 0.3rem;
  right: 0.2rem;
  width: 1rem;
  height: 1rem;
  display: flex;
  cursor: pointer;
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
  cursor:pointer;
  
`
const CartHeaderSpan = styled.span`

`
export default function CartComp() {
    const { setSearchComp,setCartComp } = useBeerContextApi();
    const {cartItems, removeFromCart, reduceFromCart, increaseToCart} = useCartContextApi()
    const navigate = useNavigate();
    const Total = ()=>{
        let total = cartItems.reduce((acc,curr)=>acc+(curr.quantity*(curr.item.price)),0)
        return total;
    }
    
    useEffect(()=>{
        setSearchComp(false)
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
                        <Link to={`/beer/${beer.item?.idDrink}`}><img src={beer.item.strDrinkThumb} className="responsive" alt={beer.item.strDrink} /></Link>
                      </div>
                      <div className="cartBeerDetails">
                        <Link to={`/beer/${beer.item?.idDrink}`}><h3>{beer.item.strDrink}</h3></Link>
                        <p>{beer?.item?.strAlcoholic}</p>
                        <p>Price: $ {(beer.item.price)}</p>
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
                    <span>{cartItems.reduce((acc, curr) => acc + curr.quantity * (curr.item.price), 0).toFixed(2)}</span>
                  </Header4>
                  <Header4>
                    <span>Special Discount</span>
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
}
