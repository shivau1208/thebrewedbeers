import React, { useEffect, useState } from "react";
import { useBeerContextApi } from "@/context/apis";
import SingleBeer from "@/components/singleBeer";
import Nodatafound from "@/components/Error/Nodatafound";
import { useParams } from "react-router-dom";
import "./viewall.css";
import { Throttle } from "@/utils/categorisedBeers";

export default function ViewAll() {
  const { products, setSearchComp, setCartComp } = useBeerContextApi();
  const [visibleProducts, setVisibleProducts] = useState(20);
  const { category, ingredient } = useParams();


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
    window.scrollTo(0, 0);
    window.addEventListener("scroll", Throttle(handleScroll, 2000));
    // let pro = products.filter((item) => item[category ? "strCategory" : "strIngredient1"].toLowerCase() === (category || ingredient).toLowerCase())
  }, []);
  return (
    <>
      <div className="filteredProductsFilter">
        {products !== null && products.length ? (
          <div>
            <div className="filteredBeerProducts">
              {products
                .filter((item) => item[category ? "strCategory" : "strIngredient1"].toLowerCase() === (category || ingredient).toLowerCase())
                .slice(0, visibleProducts)
                .map((beer, index) => (
                  <SingleBeer key={index} beer={beer} />
                ))}
            </div>
            {visibleProducts < products.filter((item) => item[category ? "strCategory" : "strIngredient1"].toLowerCase() === (category || ingredient).toLowerCase()).length && (
              <div style={{ textAlign: "center", width: "100%", paddingBottom: "20px", fontSize: "1.25rem" }}>
                <p>Loading...</p>
              </div>
            )}
          </div>
        ) : (
          <Nodatafound />
        )}
      </div>
    </>
  );
}
