import React from "react";
import "../pages/products/products.css";
import styled from "styled-components";
import { useCartContextApi } from "../context/cartContextApi";
import { Link } from "react-router-dom";
// import useImgReducer from "imgreducer";

const PlusCartButton = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
`;
export default function SingleBeer({ beer }) {
  const { addToCart } = useCartContextApi();
  // const {src} = useImgReducer(beer?.strDrinkThumb,'avif',0.5);

  return (
    <div className="beer">
      <div className="beerImage">
        <Link to={`/beer/${beer?.idDrink}`}>
          <img src={src} loading="lazy" className="" alt={beer.strDrink} />
        </Link>
      </div>
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
        <img src="/plus-large.svg" alt="plus-button" />
      </PlusCartButton>
    </div>
  );
}
