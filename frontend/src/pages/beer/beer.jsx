import { useEffect, useRef, useState } from 'react';
import './beer.scss';
import '../home/home.scss'
import { auth } from '../auth/firebaseConf';
import CommentsService from 'https://dccpwq72o6kla.cloudfront.net/main.min.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useBeerContextApi } from '@/context/beerContextApi';
import styled from 'styled-components';
import { useCartContextApi } from '@/context/cartContextApi';
import { ImgCDN } from '@/App';
import { CategorisedBeers } from '@/utils/categorisedBeers';

const BeerParent = styled.div`
  background-color:#f4f4f4;
  height:fit-content;
  padding-bottom: 10px;
  position:relative;
`
const BeerdetailWrapper = styled.div`
  max-height: 100%;
  overflow-y: auto;
`

export default function Beer() {
  const {data,setCartComp,setSearchComp,setActiveItem} = useBeerContextApi();
  const {cartItems,addToCart} = useCartContextApi();
  const [isAddedToCart,setIsAddedToCart] = useState(false)
  const [beerDetails,setBeerDetails] = useState(null)
  const {id} = useParams();
  const navigate = useNavigate();
  const beer = data.find(item=>item?.idDrink==id);
  const commentsIframeRef = useRef();
  const commentsButton = useRef();

  function AddToCartFunc() {
    setIsAddedToCart(true); 
    addToCart(beer); 
  }
  
  useEffect(()=>{
    setActiveItem("")
    setIsAddedToCart(false);
    setBeerDetails(beer);
    setSearchComp(true);
    setCartComp(true);
  },[beer])

  useEffect(() => {
    // Only initialize commentsService when the ref is attached
    if (commentsIframeRef.current) {
      const  commentsService = new CommentsService({
        commentsButton:commentsButton.current,
        commentsIframeWrapper:commentsIframeRef.current,
        COOKIE_NAME:"cid",
        // IFRAME_ORIGIN:"http://localhost:5173",
        IFRAME_ORIGIN:"https://comments-section-frontend-qtdfocztwa-el.a.run.app",
        services:{
          signIn: ()=>{},
          handleAuthOnLoad:async function() {
            auth.onAuthStateChanged(async (user) => {
              if (user) {
                localStorage.setItem("user", JSON.stringify({ email: user?.email, profile: user?.photoURL, userId: user.uid, lastRefresh:user.reloadUserInfo.lastRefreshAt})); // Set the token in local storage
              }
            });
          },
          postId:() => beer?.idDrink,
        }
      })

      if(!(/Mobi|Android/i.test(navigator.userAgent))){
        commentsService.init().createCommentsIframe();
      }
    }
  }, [beerDetails]);
  
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
            <div className="buyOrAdd desktop">
              {!isAddedToCart && !cartItems.find(cartItem=>cartItem.item.idDrink===beer.idDrink) ? <button type="button" className='addToCart' onClick={AddToCartFunc}>Add To Cart</button> :
              <button type="button" className='addToCart' onClick={()=>navigate('/cartitems')}>Go To Cart</button>}
              <button type="button" className='buyNow'onClick={()=>{navigate('/online-payment')}}> Buy Now</button>
            </div>
          </div>
          <BeerdetailWrapper>
            <div className='beer_Details'>
                <p className='beerName'>{beerDetails?.strDrink}</p>
                <p>{beerDetails?.strAlcoholic}</p>
                <p className='price'><strong>&#8377;{`${(beerDetails?.price-beerDetails?.rating*10).toFixed(2)}`}</strong> <strike>{beerDetails?.price}</strike> {`${beerDetails?.rating*10}% off`}  </p>
                <div className='ratings'><div> {`${beerDetails?.rating} ★ `}</div> <small>{`${beerDetails?.idDrink} Ratings`}</small></div>
                <p className='offers'><img src="/tag-price.svg" alt="" srcSet="" /> <strong>Bank Offer</strong> Get 10% off upto ₹50 on first UPI transaction on order of ₹250 and above T&C</p>
                <p className='offers'><img src="/tag-price.svg" alt="" srcSet="" /> <strong>Bank Offer</strong> 5% Cashback on ABC Bank Card T&C</p>
                <p className='offers'><img src="/tag-price.svg" alt="" srcSet="" /> <strong>Bank Offer</strong> 10% off up to ₹1,250 on ABC Bank Credit Card Transactions, on orders of ₹5,000 and above T&C</p>
            </div>
            <div className="beerSpec">
              <h4>Instructions:</h4>
              <p>{beerDetails?.strInstructions}</p>
            </div>
            <h3>Reviews</h3>
            <div className="iframeContent" ref={commentsIframeRef}></div>
          </BeerdetailWrapper>
          
        </div>
        <div className="randomHeader">
          <p>Cocktail</p>
          <Link to={"/beers/category/cocktail"} onClick={() => setActiveItem("beers")}>View all</Link>
        </div>
        <div className="random1">
          <div className="beerContainer">
            <CategorisedBeers filterValue={"Cocktail"} type={"strCategory"} />
            <div className="swipe-indicator"></div>
          </div>
        </div>
        <div className="randomHeader">
          <p>Gin</p>
          <Link to={"/beers/ingredient/gin"} onClick={() => setActiveItem("beers")}>View all</Link>
        </div>
        <div className="random1">
          <div className="beerContainer">
            <CategorisedBeers filterValue={"Gin"} type={"strIngredient1"} />
            <div className="swipe-indicator"></div>
          </div>
        </div>
        <div className="randomHeader">
          <p>Vodka</p>
          <Link to={"/beers/ingredient/vodka"} onClick={() => setActiveItem("beers")}>View all</Link>
        </div>
        <div className="random1">
          <div className="beerContainer">
            <CategorisedBeers filterValue={"Vodka"} type={"strIngredient1"} />
            <div className="swipe-indicator"></div>
          </div>
        </div>
        <div className="buyOrAdd mobile">
          {!isAddedToCart && !cartItems.find(cartItem=>cartItem.item.idDrink===beer.idDrink) ? <button type="button" className='addToCart' onClick={AddToCartFunc}>Add To Cart</button> :
            <button type="button" className='addToCart' onClick={()=>navigate('/cartitems')}>Go To Cart</button>}
          <button type="button" className='buyNow'onClick={()=>{navigate('/online-payment')}}> Buy Now</button>
        </div>
      </BeerParent>
    </>
  )

  
}
