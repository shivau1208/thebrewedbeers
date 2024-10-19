import React, { Suspense, useEffect, useMemo } from "react";
import { useBeerContextApi } from "../../context/beerContextApi";
import Footer from "../../components/footer/footer";
import DotLoader from "../../components/spinner/DotLoader";
import Nodatafound from "../../components/Error/Nodatafound";
import "./home.scss";
import { Link } from "react-router-dom";

// Lazy load the SingleBeer component
const SingleBeerComp = React.lazy(() => import("../../components/singleBeer"));
export default function Home() {
  const { setCartComp, products,setSearchComp,setSideBarShow } = useBeerContextApi();
  useEffect(() => {
    setCartComp(true);
    setSearchComp(true);
    setSideBarShow(true);
  }, [products]);

  const FilteredBeers = ()=> {return useMemo(() => {
    return products
      .slice() // shallow copy
      .sort(() => Math.random() - 0.5) // random sorting
      .filter((item) => item?.rating >= 4) // filtering
      .slice(0, 6) // slicing
      .map((beer, index) => (
        <Suspense key={index} fallback={<DotLoader />}>
          <SingleBeerComp beer={beer} />
        </Suspense>
      ))
  }, [products])};
  const CategorisedBeers = ({ filterValue, type }) => {
    return useMemo(()=>{
      return products
      .filter((item) => item[type] == filterValue)
      .sort(() => Math.random() - 0.5)
      .slice(0, 6)
      .map((beer, index) => (
        <Suspense key={index} fallback={<DotLoader />}>
          <SingleBeerComp beer={beer} />
        </Suspense>
      ))});
  };
  return (
    <>
      {products !== null ? (
        <div className="main">
          <div className="random">
            <div className="beerContainer">
              <FilteredBeers />
              <div className="swipe-indicator"></div>
            </div>
          </div>
          <div className="random1">
            <div className="randomHeaderParent">
              <div className="randomHeader">
                <p>Cocktail</p>
                <Link to={"/beers/category/cocktail"}>View all</Link>
              </div>
              <hr />
            </div>
            <div className="beerContainer">
              <CategorisedBeers filterValue={"Cocktail"} type={"strCategory"} />
              <div className="swipe-indicator"></div>
            </div>
          </div>
          <div className="random1">
            <div className="randomHeaderParent">
              <div className="randomHeader">
                <p>Shakes</p>
                <Link to={"/beers/category/shake"}>View all</Link>
              </div>
              <hr />
            </div>
            <div className="beerContainer">
              <CategorisedBeers filterValue={"Shake"} type={"strCategory"} />
              <div className="swipe-indicator"></div>
            </div>
          </div>
          <div className="random1">
            <div className="randomHeaderParent">
              <div className="randomHeader">
                <p>Shots</p>
                <Link to={"/beers/category/Shot"}>View all</Link>
              </div>
              <hr />
            </div>
            <div className="beerContainer">
              <CategorisedBeers filterValue={"Shot"} type={"strCategory"} />
              <div className="swipe-indicator"></div>
            </div>
          </div>
          <div className="random1">
            <div className="randomHeaderParent">
              <div className="randomHeader">
                <p>Gin</p>
                <Link to={"/beers/ingredient/gin"}>View all</Link>
              </div>
              <hr />
            </div>
            <div className="beerContainer">
              <CategorisedBeers filterValue={"Gin"} type={"strIngredient1"} />
              <div className="swipe-indicator"></div>
            </div>
          </div>
          <div className="random1">
            <div className="randomHeaderParent">
              <div className="randomHeader">
                <p>Vodka</p>
                <Link to={"/beers/ingredient/vodka"}>View all</Link>
              </div>
              <hr />
            </div>
            <div className="beerContainer">
              <CategorisedBeers filterValue={"Vodka"} type={"strIngredient1"} />
              <div className="swipe-indicator"></div>
            </div>
          </div>
          <div className="random1">
            <div className="randomHeaderParent">
              <div className="randomHeader">
                <p>Rum</p>
                <Link to={"/beers/ingredient/rum"}>View all</Link>
              </div>
              <hr />
            </div>
            <div className="beerContainer">
              <CategorisedBeers filterValue={"Rum"} type={"strIngredient1"} />
              <div className="swipe-indicator"></div>
            </div>
          </div>
        </div>
      ) : (
        <Nodatafound />
      )}
      <Footer />
    </>
  );
}
function newFunction() {
  const initSlider = () => {
    const beerList = document.querySelector(".beerContainer");
    const slideButtons = document.querySelectorAll(".beerContainer .btn");
    slideButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const direction = button.id === "btn-prev" ? -1 : 1;
        const scrollAmount = beerList.clientWidth * direction;
        beerList.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
    });
  };
  // const nextSlide = ()=>{
  //     let beer = document.querySelector('.beerContainer')
  //     if(beer){
  //         beer.scrollTo({
  //             left:beer.scrollLeft+beer.firstElementChild.offsetWidth,
  //             behavior:"smooth"
  //         })
  //     }
  // }

  // const prevSlide = ()=>{
  //     let beer = document.querySelector('.beerContainer')
  //     if(beer){
  //         beer.scrollTo({
  //             left:beer.scrollLeft-beer.firstElementChild.offsetWidth,
  //             behavior:"smooth"
  //         })
  //     }
  // }
  return { initSlider };
}
