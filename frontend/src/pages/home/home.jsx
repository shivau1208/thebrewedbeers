import React, { Suspense, useContext, useEffect } from 'react';
import './home.scss';
import { BeersContext, useBeerContextApi } from '../../context/beerContextApi';
import SingleBeer from '../../components/singleBeer';
import Footer from '../../components/footer/footer';
import DotLoader from '../../components/spinner/DotLoader';
import Nodatafound from '../../components/Error/Nodatafound';

// Lazy load the SingleBeer component
const SingleBeerComp = React.lazy(() => import('../../components/singleBeer'));
export default function ListBeers() {
  const { data, setSearchComp } = useBeerContextApi();
  const { initSlider } = newFunction();
  useEffect(() => {
    setSearchComp(true);
  }, []);
  return (
    <div className='home'>
      {data !==null ? (
        <div className='beerContainer'>
          {data
            .slice()
            .sort(() => Math.random() - 0.5)
            .slice(0,6)
            .map((beer, index) => (
              <Suspense key={index} fallback={<DotLoader />}>
                <SingleBeerComp beer={beer} />
              </Suspense>
              // <SingleBeer
              //   key={index}
              //   beer={beer}
              // />
            ))}
          <div className='swipe-indicator'></div>
        </div>
      ) : (
        <Nodatafound />
      )}
      <Footer />
    </div>
  );
}
function newFunction() {
  const initSlider = () => {
    const beerList = document.querySelector('.beerContainer');
    const slideButtons = document.querySelectorAll('.beerContainer .btn');
    slideButtons.forEach((button) => {
      button.addEventListener('click', function () {
        const direction = button.id === 'btn-prev' ? -1 : 1;
        const scrollAmount = beerList.clientWidth * direction;
        beerList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
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
