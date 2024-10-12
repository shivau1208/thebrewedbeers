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

export default function Payment() {
  const { clearCart,cartTotal } = useCartContextApi();
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
  let payload = {
    merchantId: "PGTESTPAYUAT",
    merchantTransactionId: "MT7850590068188104",
    merchantUserId: "MUID123",
    amount: `${amount * 100}`,
    redirectUrl: `https://buymybeer.vercel.app/home`,
    redirectMode: "REDIRECT",
    callbackUrl: `https://buymybeer.vercel.app/home`,
    mobileNumber: "9999999999",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };
  let json_string = JSON.stringify(payload);
  let b64Data = btoa(json_string);
  let saltKey = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
  let saltIndex = 1;
  let string = b64Data + "/pg/v1/pay" + saltKey;
  let sha256_val = sha256(string);
  let checkSum = sha256_val + "###" + saltIndex;
  const options = {
    method: "post",
    url: "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
    request: b64Data,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checkSum,
    },
    data: {
      request: b64Data,
    },
  };
  async function phonepeApi() {
    let res = await axios
      .request(options)
      .then((response) => response.data)
      .catch((error) => console.error(error));
    window.location.replace(res.data.instrumentResponse.redirectInfo.url);
  }
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
      <div class="bilingAddress">
        <p class="billing_text mb_23px">Delievery Info</p>
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
      {popUp && <div className="orderPlacedpopUp">
          <img src="/checkmark.svg" alt="checkmark" srcset="" width={"100"} />
          <p>Your Order is Placed</p>
          <button onClick={PopupOkBtn}>Ok</button>
      </div>}
      {/* <div>
        <PaymentBackBtn onClick={() => navigate(-1)}>
          <img src="/back-btn.svg" alt="go back" srcSet="" />
        </PaymentBackBtn>
        <div className="paymentGate">
          <div className="address">
            <textarea name="" id="" cols="30" rows="5" placeholder="Please fill delivery address"></textarea>
          </div>
          <div className="amount">
            <span>Total amount to pay:</span>
            <span>&#8377;{(Total() - (Total() * 5) / 100).toFixed(2)}</span>
          </div>
          <div className="paymentBtn" onClick={() => phonepeApi()}>
            <img src="/phonepe-svgrepo-com.svg" alt="" srcSet="" width="30" />
            <span>PAY HERE</span>
          </div>
        </div>
      </div> */}
    </>
  );
}
