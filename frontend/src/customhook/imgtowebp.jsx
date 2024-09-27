import React, { useState } from 'react'

export default async function useImgtowebp(url) {
  const [src,setSrc] = useState(null)
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
  return {src}
}
