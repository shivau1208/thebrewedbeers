import React, { useContext, useEffect, useState } from 'react';
import '../pages/products/products.css';
import styled from 'styled-components'
import { BeersContext } from '../context/beerContextApi';
import { useCartContextApi } from '../context/cartContextApi';
import { Link } from 'react-router-dom';


const Button = styled.button`
  border:0;
  outline:0;
  cursor: pointer;
`;
const PlusCartButton = styled.div`
  position:absolute;
  bottom:10px;
  right:10px;
  cursor:pointer;
`;

export default function SingleBeer({beer}) {
  const {addToCart} = useCartContextApi();
  const [src,setSrc] = useState(null)
  async function convertImageToWebP(url) {
    // Fetch the image as a blob
    const response = await fetch(url);
    const blob = await response.blob();

    // Create an image element
    const image = new Image();
    image.src = URL.createObjectURL(blob);
    
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      
      // Draw the image on the canvas
      ctx.drawImage(image, 0, 0);

      // Convert the canvas content to WebP
      canvas.toBlob(function(webpBlob) {
        const webpUrl = URL.createObjectURL(webpBlob);
        setSrc(webpUrl);

      }, 'image/webp');
    };
  }
  useEffect(()=>{
    convertImageToWebP(beer?.strDrinkThumb);
  },[beer])
  return (
    <div className='beer'>
        <div className='beerImage'>
            <Link to={`/beer/${beer?.idDrink}`}><img src={src ? src : beer.strDrinkThumb} className="" alt={beer.strDrink}  /></Link>
        </div>
        <div className='beerDetails'>
            <Link to={`/beer/${beer?.idDrink}`}><h3>{beer?.strDrink}</h3></Link>
            <p className='ratingsandprice'>{`${beer?.rating*10}% off`} <strike>{beer?.price}</strike> <strong>{`$ ${(beer?.price-beer?.rating*10).toFixed(2)}`}</strong></p>
            <p>{beer?.strAlcoholic}</p>
            <p className='ratingsandprice'>{`★`.repeat(beer?.rating)} <small>{`(${beer?.idDrink})`}</small></p>
        </div>
        <PlusCartButton className='plusCartButton' onClick={()=>addToCart(beer.idDrink)} >
            <img src="/plus-large.svg" alt="plus-button" />
        </PlusCartButton>
    </div>
  )
}
