import React, { useEffect } from "react";
import { useBeerContextApi } from "@/context/apis";
import Footer from "@/components/footer/footer";
import Nodatafound from "@/components/Error/Nodatafound";
import "./home.scss";
import { Link } from "react-router-dom";
import { CategorisedBeers, FilteredBeers } from "@/utils/categorisedBeers";

// Lazy load the SingleBeer component
export default function Home() {
  const { setCartComp, products,setSearchComp,setActiveItem } = useBeerContextApi();
  useEffect(() => {
    setCartComp(true);
    setSearchComp(true);
  }, [products]);
  
  useEffect(()=>{
    if(document.getElementById('searchInput')){
      document.getElementById('searchInput').value = "";
    }
  },[])
  
  return (
    <>
      {products?.length ? (
        <div className="main">
          <div className="randomHeader">
            <p>Most Rated</p>
          </div>
          <div className="random">
            <div className="beerContainer">
              <FilteredBeers />
              <div className="swipe-indicator"></div>
            </div>
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
            <p>Shakes</p>
            <Link to={"/beers/category/shake"} onClick={() => setActiveItem("beers")}>View all</Link>
          </div>
          <div className="random1">
            <div className="beerContainer">
              <CategorisedBeers filterValue={"Shake"} type={"strCategory"} />
              <div className="swipe-indicator"></div>
            </div>
          </div>
          <div className="randomHeader">
            <p>Shots</p>
            <Link to={"/beers/category/Shot"} onClick={() => setActiveItem("beers")}>View all</Link>
          </div>
          <div className="random1">
            <div className="beerContainer">
              <CategorisedBeers filterValue={"Shot"} type={"strCategory"} />
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
          <div className="randomHeader">
            <p>Rum</p>
            <Link to={"/beers/ingredient/rum"} onClick={() => setActiveItem("beers")}>View all</Link>
          </div>
          <div className="random1">
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
