import React, { useEffect, useState } from 'react';
import './beer.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useBeerContextApi } from '../../context/beerContextApi';
import styled from 'styled-components';
import { useCartContextApi } from '../../context/cartContextApi';
import { ImgCDN } from '../../App';

const BeerParent = styled.div`
  background-color:#f4f4f4;
  height:100dvh
`

export default function Beer() {
  const {data,setCartComp,setSearchComp} = useBeerContextApi();
  const {cartItems,addToCart} = useCartContextApi();
  const [isAddedToCart,setIsAddedToCart] = useState(false)
  const [beerDetails,setBeerDetails] = useState(null)
  const {id} = useParams();
  const navigate = useNavigate();
  const beer = data.find(item=>item?.idDrink==id);

  function AddToCartFunc() {
      setIsAddedToCart(true); 
      addToCart(beer); 
  }
  useEffect(()=>{
    setBeerDetails(beer);
    setSearchComp(true);
    setCartComp(true);
  },[beer])

  if(!beerDetails){
    return(
      <>
        <>Loading....</>
      </>
    )
  }
  return (
    <>
      <BeerParent>
        <div className="beer_Container">
          <div>
            <div className="beerView">
              <img src={`${ImgCDN}/${beerDetails.strDrinkThumb}`} alt="img" srcSet="" />
            </div>
          </div>
          <div>
            <div className='beer_Details'>
                <p className='beerName'>{beerDetails?.strDrink}</p>
                <p>{beerDetails?.strAlcoholic}</p>
                <p className='price'><strong>&#8377;{`${(beerDetails?.price-beerDetails?.rating*10).toFixed(2)}`}</strong> <strike>{beerDetails?.price}</strike> {`${beerDetails?.rating*10}% off`}  </p>
                <div className='ratings'><div> {`${beerDetails?.rating} ★ `}</div> <small>{`${beerDetails?.idDrink} Ratings`}</small></div>
                <p className='offers'><img src="/tag-price.svg" alt="" srcSet="" /> <strong>Bank Offer</strong> Get 10% off upto ₹50 on first Flipkart UPI transaction on order of ₹250 and above T&C</p>
                <p className='offers'><img src="/tag-price.svg" alt="" srcSet="" /> <strong>Bank Offer</strong> 5% Cashback on Flipkart Axis Bank Card T&C</p>
                <p className='offers'><img src="/tag-price.svg" alt="" srcSet="" /> <strong>Bank Offer</strong> 10% off up to ₹1,250 on ICICI Bank Credit Card Transactions, on orders of ₹5,000 and above T&C</p>
            </div>
            <div className="beerSpec">
              <h4>Instructions:</h4>
              <p>{beerDetails?.strInstructions}</p>
            </div>
          </div>
          <div className="buyOrAdd">
            {!isAddedToCart && !cartItems.find(cartItem=>cartItem.item.idDrink===beer.idDrink) ? <button type="button" className='addToCart' onClick={AddToCartFunc}>Add To Cart</button> :
             <button type="button" className='addToCart' onClick={()=>navigate('/cartitems')}>Go To Cart</button>}
            <button type="button" className='buyNow'onClick={()=>{navigate('/online-payment')}}> Buy Now</button>
          </div>
        </div>
        
      </BeerParent>
    </>
  )

  
}
