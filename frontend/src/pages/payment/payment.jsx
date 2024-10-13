import React, { useEffect, useState } from "react";
import axios from "axios";
import "./payment.scss";
import { sha256 } from "js-sha256";
import { useCartContextApi } from "../../context/cartContextApi";
import Navbar from "../../components/navBar/Navbar";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import confetti from 'https://esm.run/canvas-confetti@1';
import { useBeerContextApi } from "../../context/beerContextApi";
import { AlertFunc } from "../../components/Alert/Alert";

const PaymentBackBtn = styled.button`
  border: 1px solid;
  outline: none;
  padding: 0.7rem 0.6rem;
  margin-right: 1rem;
  height: 100%;
  cursor: pointer;
`;

const Header4 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 1rem;
`;
const Header2 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 1rem;
  font-size: 24px;
  font-weight: 500;
  background-color: #f4f4f4;
`;

export default function Payment() {
  const { cartItems,clearCart,cartTotal } = useCartContextApi();
  const {setSearchComp,setCartComp, setSideBarShow} = useBeerContextApi();
  const [popUp,setPopUp] = useState(false)
  const [deliverAddress,setDeliverAddress] = useState({
    fullname:"",
    mnumber:"",
    email:"",
    address:""
  })
  const navigate = useNavigate();

  let amount = (cartTotal() - (cartTotal() * 5) / 100).toFixed(2);
  
  const PlaceOrder = ()=>{
    let keys = Object.keys(deliverAddress)
    if(keys.every((item)=>deliverAddress[item])){
      clearCart()
      setPopUp(true);
      confetti({
        particleCount: 150,
        spread: 60
      });
    }else{
      AlertFunc("Please fill all fields", "info", 2000);
    }
  }
  const PopupOkBtn = ()=>{
    setPopUp(false);
    navigate('/home')
  }
  useEffect(()=>{
    setSearchComp(false);
    setCartComp(false)
    setSideBarShow(true)
  },[])
  const SetDlvrAdrs = (event)=>{
    const {name,value} = event.target
    setDeliverAddress((prevState)=>({...prevState,[name]:value}))
  }
  return (
    <>
      <Navbar />
      <div className="paymentPage">
        <div class="bilingAddress">
          <p class="billing_text">Delievery Info</p>
          <div class="input_form">
            <div class="row">
              <div class="col-md-6">
                <div class="input_box_cart">
                  <input type="" name="fullname" value={deliverAddress.fullname} onChange={SetDlvrAdrs} placeholder="Full Name" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="input_box_cart">
                  <input type="" name="mnumber" value={deliverAddress.mnumber} onChange={SetDlvrAdrs} placeholder="Mobile Number" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="input_box_cart">
                  <input type="" name="email" value={deliverAddress.email} onChange={SetDlvrAdrs} placeholder="Email Address" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="input_box_cart">
                  <textarea rows="4" name="address" value={deliverAddress.address} onChange={SetDlvrAdrs} placeholder="Full Address"></textarea>
                </div>
              </div>
            </div>
          </div>
          <button type="button" onClick={PlaceOrder} class="total_btn_cart text_center_button">
            Place Order
          </button>
        </div>
        <div className="cartTotal">
          <div className="priceDetails">
            <p>Price Details</p>
            <hr />
            <Header4>
              <span>{`Price (${cartItems.length} item${cartItems.length > 1 ? 's' : ''})`}</span>
              <span>{cartTotal().toFixed(2)}</span>
            </Header4>
            <Header4>
              <span>Delivery Charges</span>
              <span>FREE</span>
            </Header4>
            <hr />
            <Header2>
              <span>Total Amount</span>
              <span>&#8377;{amount}</span>
            </Header2>
          </div>
        </div>
      </div>
      {popUp && <div className="orderPlacedpopUp">
          <img src="/checkmark.svg" alt="checkmark" srcset="" width={"100"} />
          <p>Your Order is Placed</p>
          <button onClick={PopupOkBtn}>Ok</button>
      </div>}
    </>
  );
}
