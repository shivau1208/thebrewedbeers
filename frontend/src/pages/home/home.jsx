import React, { Suspense, useEffect } from "react";
import { useBeerContextApi } from "../../context/beerContextApi";
import Footer from "../../components/footer/footer";
import DotLoader from "../../components/spinner/DotLoader";
import Nodatafound from "../../components/Error/Nodatafound";
import Navbar from "../../components/navBar/Navbar";
import "./home.scss";

// Lazy load the SingleBeer component
const SingleBeerComp = React.lazy(() => import("../../components/singleBeer"));
export default function ListBeers() {
  const { data, setSearchComp ,setCartComp} = useBeerContextApi();
  
  useEffect(() => {
    setSearchComp(false);
    setCartComp(true);
  }, []);
  return (
    <>
      <Navbar />
      <div className="home">
        {data !== null ? (
          <div className="beerContainer">
            {data
              .slice()
              .sort(() => Math.random() - 0.5)
              .filter(item=>item?.rating >= 4)
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
