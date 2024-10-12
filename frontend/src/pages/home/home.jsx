import React, { Suspense, useEffect } from "react";
import { useBeerContextApi } from "../../context/beerContextApi";
import Footer from "../../components/footer/footer";
import DotLoader from "../../components/spinner/DotLoader";
import Nodatafound from "../../components/Error/Nodatafound";
import Navbar from "../../components/navBar/Navbar";
import "./home.scss";
import { Link } from "react-router-dom";

// Lazy load the SingleBeer component
const SingleBeerComp = React.lazy(() => import("../../components/singleBeer"));
export default function ListBeers() {
  const { data, setCartComp, products } = useBeerContextApi();
  useEffect(() => {
    setCartComp(true);
  }, []);
  return (
    <>
      <Navbar />
      <div className="main">
        <div className="random">
          {products !== null ? (
            <div className="beerContainer">
              {products
                .slice()
                .sort(() => Math.random() - 0.5)
                .filter((item) => item?.rating >= 4)
                .slice(0, 6)
                .map((beer, index) => (
                  <Suspense key={index} fallback={<DotLoader />}>
                    <SingleBeerComp beer={beer} />
                  </Suspense>
                ))}
              <div className="swipe-indicator"></div>
            </div>
          ) : (
            <Nodatafound />
          )}
        </div>
        <div className="random1">
          <div className="randomHeaderParent">
            <div className="randomHeader">
              <p>Cocktail</p>
              <Link to={"/beers/category/cocktail"}>View all</Link>
            </div>
            <hr />
          </div>
          {products !== null ? (
            <div className="beerContainer">
              {products
                .filter((item) => item?.strCategory == "Cocktail")
                .sort(() => Math.random() - 0.5)
                .slice(0, 6)
                .map((beer, index) => (
                  <Suspense key={index} fallback={<DotLoader />}>
                    <SingleBeerComp beer={beer} />
                  </Suspense>
                ))}
              <div className="swipe-indicator"></div>
            </div>
          ) : (
            <Nodatafound />
          )}
        </div>
        <div className="random1">
          <div className="randomHeaderParent">
            <div className="randomHeader">
              <p>Shakes</p>
              <Link to={"/beers/category/Shake"}>View all</Link>
            </div>
            <hr />
          </div>
          {products !== null ? (
            <div className="beerContainer">
              {products
                .filter((item) => item?.strCategory == "Shake")
                .sort(() => Math.random() - 0.5)
                .slice(0, 6)
                .map((beer, index) => (
                  <Suspense key={index} fallback={<DotLoader />}>
                    <SingleBeerComp beer={beer} />
                  </Suspense>
                ))}
              <div className="swipe-indicator"></div>
            </div>
          ) : (
            <Nodatafound />
          )}
        </div>
        <div className="random1">
          <div className="randomHeaderParent">
            <div className="randomHeader">
              <p>Shots</p>
              <Link to={"/beers/category/Shot"}>View all</Link>
            </div>
            <hr />
          </div>
          {products !== null ? (
            <div className="beerContainer">
              {products
                .filter((item) => item?.strCategory == "Shot")
                .sort(() => Math.random() - 0.5)
                .slice(0, 6)
                .map((beer, index) => (
                  <Suspense key={index} fallback={<DotLoader />}>
                    <SingleBeerComp beer={beer} />
                  </Suspense>
                ))}
              <div className="swipe-indicator"></div>
            </div>
          ) : (
            <Nodatafound />
          )}
        </div>
        <div className="random1">
          <div className="randomHeaderParent">
            <div className="randomHeader">
              <p>Gin</p>
              <Link to={"/beers/ingredient/gin"}>View all</Link>
            </div>
            <hr />
          </div>
          {products !== null ? (
            <div className="beerContainer">
              {products
                .filter((item) => item?.strIngredient1 == "Gin")
                .sort(() => Math.random() - 0.5)
                .slice(0, 6)
                .map((beer, index) => (
                  <Suspense key={index} fallback={<DotLoader />}>
                    <SingleBeerComp beer={beer} />
                  </Suspense>
                ))}
              <div className="swipe-indicator"></div>
            </div>
          ) : (
            <Nodatafound />
          )}
        </div>

        <div className="random1">
          <div className="randomHeaderParent">
            <div className="randomHeader">
              <p>Vodka</p>
              <Link to={"/beers/ingredient/vodka"}>View all</Link>
            </div>
            <hr />
          </div>
          {products !== null ? (
            <div className="beerContainer">
              {products
                .filter((item) => item?.strIngredient1 == "Vodka")
                .sort(() => Math.random() - 0.5)
                .slice(0, 6)
                .map((beer, index) => (
                  <Suspense key={index} fallback={<DotLoader />}>
                    <SingleBeerComp beer={beer} />
                  </Suspense>
                ))}
              <div className="swipe-indicator"></div>
            </div>
          ) : (
            <Nodatafound />
          )}
        </div>
        <div className="random1">
          <div className="randomHeaderParent">
            <div className="randomHeader">
              <p>Punch / Party Drink</p>
              <Link to={"/beers/ingredient/Punch_PartyDrink"}>View all</Link>
            </div>
            <hr />
          </div>
          {products !== null ? (
            <div className="beerContainer">
              {products
                .filter((item) => item?.strIngredient1 == "Punch_PartyDrink")
                .sort(() => Math.random() - 0.5)
                .slice(0, 6)
                .map((beer, index) => (
                  <Suspense key={index} fallback={<DotLoader />}>
                    <SingleBeerComp beer={beer} />
                  </Suspense>
                ))}
              <div className="swipe-indicator"></div>
            </div>
          ) : (
            <Nodatafound />
          )}
        </div>
      </div>
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
