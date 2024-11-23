import React, { useEffect, useState } from "react";
import { useBeerContextApi } from "../../context/beerContextApi";
import SingleBeer from "../../components/singleBeer";
import Nodatafound from "../../components/Error/Nodatafound";
import SortFilter from "../../components/sortfilter/SortFilter";
import DesktopFilter from "../../components/Filter/DesktopFilter";
import "./products.css";

export default function Products() {
  const { products, setSearchComp, setCartComp } = useBeerContextApi();
  const [visibleProducts, setVisibleProducts] = useState(20);

  function Throttle(func, delay) {
    let lastFunc;
    let lastRan;
    return function () {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if (Date.now() - lastRan >= delay) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, delay - (Date.now() - lastRan));
      }
    };
  }

  // Check if the user has scrolled near the bottom
  function handleScroll() {
    const scrollableHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;

    if (scrollableHeight - scrollTop - viewportHeight < 100) {
      setVisibleProducts((prevProducts) => (prevProducts += 20));
    }
  }

  useEffect(() => {
    setSearchComp(true);
    setCartComp(true);
    window.addEventListener("scroll", Throttle(handleScroll, 2000));
  }, []);
  return (
    <>
      <SortFilter />
      {products !== null && products.length ? (
        <div className='productsFilter'>
          <DesktopFilter />
          <div>
            <div className='beerProducts'>
              {products.slice(0, visibleProducts).map((beer, index) => (
                <SingleBeer
                  key={index}
                  beer={beer}
                />
              ))}
            </div>
            {visibleProducts < products.length && (
              <div style={{ textAlign: 'center', width: '100%', paddingBottom: '20px', fontSize: '1.25rem' }}>
                <p>Loading...</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Nodatafound />
      )}
    </>
  );
}
