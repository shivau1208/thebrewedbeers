import { lazy, Suspense, useMemo } from "react";
import DotLoader from "@/components/loaders/DotLoader";
import { useBeerContextApi } from "@/context/apis";


const SingleBeerComp = lazy(() => import("@/components/singleBeer"));


export const CategorisedBeers = ({ filterValue, type }) => {
  const { products } = useBeerContextApi();
  return useMemo(()=>{
    return products
    .filter((item) => item[type] == filterValue)
    .sort(() => Math.random() - 0.5)
    .slice(0, 6)
    .map((beer, index) => (
      <Suspense key={index} fallback={<DotLoader />}>
        <SingleBeerComp beer={beer} />
      </Suspense>
    ))},[products]);
};

export const FilteredBeers = ()=> {
  const { products } = useBeerContextApi();
  return useMemo(() => {
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
  }, [products]);
};

export const Debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

export function Throttle(func, delay) {
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