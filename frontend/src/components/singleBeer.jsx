import React, { lazy, Suspense, useEffect } from "react";
import "../pages/products/products.css";
import styled from "styled-components";
import { useCartContextApi } from "../context/cartContextApi";
import { Link } from "react-router-dom";
import { ImgCDN } from "../App";
import Cardloader from "./loaders/cardloader";

const PlusCartButton = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
`;

const LazyImageComponent = lazy(() => import("./LazyImages"));

export default function SingleBeer({ beer }) {
  const { addToCart } = useCartContextApi();
  return (
    <div className="beer">
      <Suspense fallback={<Cardloader />}>
        <div className="beerImage">
          <Link to={`/beer/${beer?.idDrink}`}>
            <LazyImageComponent beer={beer} />
          </Link>
        </div>
      </Suspense>
      <div className="beerDetails">
        <Link to={`/beer/${beer?.idDrink}`}>
          <h3>{beer?.strDrink}</h3>
        </Link>
        <p className="ratingsandprice">
          {`${beer?.rating * 10}% off`} <strike>{beer?.price}</strike> <strong>&#8377;{`${(beer?.price - beer?.rating * 10).toFixed(2)}`}</strong>
        </p>
        <p>{beer?.strAlcoholic}</p>
        <p className="ratingsandprice">
          {`★`.repeat(beer?.rating)} <small>{`(${beer?.idDrink})`}</small>
        </p>
      </div>
      <PlusCartButton className="plusCartButton" onClick={() => addToCart(beer)}>
        <img src="/plus-large.svg" alt="plus-button" width="27" height="27" />
      </PlusCartButton>
    </div>
  );
}
