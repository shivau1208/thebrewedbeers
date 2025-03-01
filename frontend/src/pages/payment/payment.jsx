import React, { useEffect, useState } from "react";
import "./payment.scss";
import { useCartContextApi } from "@/context/cartContextApi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import confetti from '@/utils/confetti';
import { useBeerContextApi } from "@/context/beerContextApi";
import { AlertFunc } from "@/components/Alert/Alert";

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

const PaymentBackBtnParent = styled.div`
  height: 50px;
  display: flex;
  align-items: end;
  padding: 0.5rem 0;
`;
const PaymentBackBtn = styled.span`
  padding: 0 0.5rem;
  background-color: transparent;
  cursor: pointer;
`;

const PaymentHeaderSpan = styled.span`
  font-size: 20px;
  padding: 0.5rem 0;
`;

export default function Payment() {
  const { cartItems,clearCart,cartTotal } = useCartContextApi();
  const {setSearchComp,setCartComp} = useBeerContextApi();
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
  },[])
  const SetDlvrAdrs = (event)=>{
    const {name,value} = event.target
    setDeliverAddress((prevState)=>({...prevState,[name]:value}))
  }
  return (
    <>
      <PaymentBackBtnParent>
        <PaymentBackBtn>
          <img src="/back-btn.svg" onClick={() => navigate(-1)} alt="go back" srcSet="" height="30" />
        </PaymentBackBtn>
        <PaymentHeaderSpan>Back</PaymentHeaderSpan>
      </PaymentBackBtnParent>
      <div className="paymentPage">
        <div className="bilingAddress">
          <p className="billing_text">Delievery Info</p>
          <div className="input_form">
            <div className="row">
              <div className="col-md-6">
                <div className="input_box_cart">
                  <input type="" name="fullname" value={deliverAddress.fullname} onChange={SetDlvrAdrs} placeholder="Full Name" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input_box_cart">
                  <input type="" name="mnumber" value={deliverAddress.mnumber} onChange={SetDlvrAdrs} placeholder="Mobile Number" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="input_box_cart">
                  <input type="" name="email" value={deliverAddress.email} onChange={SetDlvrAdrs} placeholder="Email Address" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="input_box_cart">
                  <textarea rows="4" name="address" value={deliverAddress.address} onChange={SetDlvrAdrs} placeholder="Full Address"></textarea>
                </div>
              </div>
            </div>
          </div>
          <button type="button" onClick={PlaceOrder} className="total_btn_cart text_center_button">
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
          <img src="/checkmark.svg" alt="checkmark" srcSet="" width={"100"} />
          <p>Your Order is Placed</p>
          <button onClick={PopupOkBtn}>Ok</button>
      </div>}
    </>
  );
}
