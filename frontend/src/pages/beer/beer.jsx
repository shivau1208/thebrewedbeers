import React, { useEffect, useLayoutEffect, useState } from 'react';
import './beer.scss';
import Navbar from '../../components/navBar/Navbar';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useBeerContextApi } from '../../context/beerContextApi';
import styled from 'styled-components';
import { useCartContextApi } from '../../context/cartContextApi';

const BeerParent = styled.div`
  background-color:#f4f4f4;
  height:100dvh
`

export default function Beer() {
  const {data,setCartComp} = useBeerContextApi();
  const {addToCart} = useCartContextApi();
  const [isAddedToCart,setIsAddedToCart] = useState(false)
  const [beerDetails,setBeerDetails] = useState(null)
  const {id} = useParams();
  const navigate = useNavigate();
  const beer = data.find(item=>item?.idDrink==id);
  useEffect(()=>{
    setBeerDetails(beer);
    setCartComp(true);
  },[beer])

  if(!beerDetails){
    return(
      <>
        <Navbar />
        <>Loading....</>
      </>
    )
  }
  return (
    <>
      <Navbar />
      <BeerParent>
        <div className="beer_Container">
          <div>
            <div className="beerView">
              <img src={beerDetails.strDrinkThumb} alt="img" srcSet="" />
            </div>
            <div className="buyOrAdd">
              {!isAddedToCart && <button type="button" className='addToCart' onClick={()=>{setIsAddedToCart(true);addToCart(beer.idDrink)}}>Add To Cart</button>}
              {isAddedToCart && <button type="button" className='addToCart' onClick={()=>navigate('/cartitems')}>Go To Cart</button>}
              <button type="button" className='buyNow'onClick={()=>{addToCart(beer.idDrink);navigate('/checkout/init')}}> Buy Now</button>
            </div>
          </div>
          <div>
            <div className='beer_Details'>
                <p className='beerName'>{beerDetails?.strDrink}</p>
                <p>{beerDetails?.strAlcoholic}</p>
                <p className='price'><strong>{`$ ${(beerDetails?.price-beerDetails?.rating*10).toFixed(2)}`}</strong> <strike>{beerDetails?.price}</strike> {`${beerDetails?.rating*10}% off`}  </p>
                <p className='ratings'><div> {`${beerDetails?.rating} ★ `}</div> <small>{`${beerDetails?.idDrink} Ratings`}</small></p>
                <p className='offers'><img src="/tag-price.svg" alt="" srcset="" /> <strong>Bank Offer</strong> Get 10% off upto ₹50 on first Flipkart UPI transaction on order of ₹250 and aboveT&C</p>
                <p className='offers'><img src="/tag-price.svg" alt="" srcset="" /> <strong>Bank Offer</strong> 5% Cashback on Flipkart Axis Bank CardT&C</p>
                <p className='offers'><img src="/tag-price.svg" alt="" srcset="" /> <strong>Bank Offer</strong> 10% off up to ₹1,250 on ICICI Bank Credit Card Transactions, on orders of ₹5,000 and aboveT&C</p>
            </div>
            <div className="beerSpec">
              <h4>Instructions:</h4>
              <p>{beerDetails?.strInstructions}</p>
            </div>
          </div>
        </div>
      </BeerParent>
    </>
  )
}
