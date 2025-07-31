import React, { useEffect, useState } from "react";
import { useBeerContextApi } from "@/context/apis";
import SingleBeer from "@/components/singleBeer";
import Nodatafound from "@/components/Error/Nodatafound";
import SortFilter from "@/components/sortfilter/SortFilter";
import DesktopFilter from "@/components/Filter/DesktopFilter";
import "./products.css";
import { Throttle } from "@/utils/categorisedBeers";

export default function Products() {
  const { products, setSearchComp, setCartComp } = useBeerContextApi();
  const [visibleProducts, setVisibleProducts] = useState(20);

  
  

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
    if(document.getElementById('searchInput')){
      document.getElementById('searchInput').value = "";
    }
  },[])
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
