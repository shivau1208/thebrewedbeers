import React from 'react'
import axios from 'axios';
import './payment.scss'
import {sha256} from 'js-sha256'
import { useCartContextApi } from '../../context/cartContextApi';

export default function CheckoutInit() {
    const { cartItems} = useCartContextApi();
    const Total = ()=>{
        let total = cartItems.reduce((acc,curr)=>acc+(curr.quantity*(curr.item.price)),0)
        return total;
    }
    let amount = (Total()-(Total()*5/100)).toFixed(2)
    let payload = {
        "merchantId": "PGTESTPAYUAT",
        "merchantTransactionId": "MT7850590068188104",
        "merchantUserId": "MUID123",
        "amount": `${amount*100}`,
        "redirectUrl": `${window.location.origin}/home`,
        "redirectMode": "REDIRECT",
        "callbackUrl": `${window.location.origin}/home`,
        "mobileNumber": "9999999999",
        "paymentInstrument": {
          "type": "PAY_PAGE"
        }
    }
    let json_string = JSON.stringify(payload)
    let b64Data = btoa(json_string)
    let saltKey = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399'
    let saltIndex = 1
    let string = b64Data + '/pg/v1/pay' + saltKey;
    let sha256_val = sha256(string)
    let checkSum= sha256_val + '###' + saltIndex;
    const options = {
        method: 'post',
        url: 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
        request: b64Data,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checkSum
        },
        data: {
            'request':b64Data
        }
    };
    async function phonepeApi(){
        let res = await axios
        .request(options)
            .then(response=>response.data)
        .catch((error)=>console.error(error));
        window.location.replace(res.data.instrumentResponse.redirectInfo.url)
    }
    
    return (
        <>
            <div className="paymentGate">
                <div className='address'>
                    <textarea name="" id="" cols="30" rows="5" placeholder='Please fill delivery address'></textarea>
                </div>
                <div className='amount'>
                    <span>Total amount to pay:</span>
                    <span>${(Total() - (Total() * 5) / 100).toFixed(2)}</span>
                </div>
                <div className='paymentBtn' onClick={()=>phonepeApi()}>
                    <img src="/phonepe-svgrepo-com.svg" alt="" srcSet="" width='30' />
                    <span>PAY HERE</span>
                </div>
            </div>
        </>
    )
}
