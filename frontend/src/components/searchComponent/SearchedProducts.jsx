import React, { useEffect, useState } from 'react';
import './searchComponent.scss';
import { useBeerContextApi } from '../../context/beerContextApi';
import Nodatafound from '../Error/Nodatafound';
import SingleBeer from '../singleBeer';
import { Throttle } from '../../utils/categorisedBeers';
import { useSearchParams } from 'react-router-dom';

export default function SearchedProducts() {
  const {data, products, setSearchComp, setCartComp ,hanldeBeerSearch} = useBeerContextApi();
  const [visibleProducts, setVisibleProducts] = useState(20);
  const [searchParams] = useSearchParams();
  let searchInput = searchParams.get("q");
  // Check if the user has scrolled near the bottom


  useEffect(() => {
    document.querySelector("#searchInput").value = searchInput;
    if(searchInput){
      hanldeBeerSearch()
    }
  }, [searchInput,data]);
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
      {products !== null && products.length ? (
        <div className='productsFilter'>
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
  )
}
