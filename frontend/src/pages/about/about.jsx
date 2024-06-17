import React, { useContext, useEffect } from 'react'
import './about.css'
import { BeersContext, useBeerContextApi } from '../../context/beerContextApi'

export default function About() {
  const {setSearchComp} = useBeerContextApi()

  useEffect(()=>{
    setSearchComp(false)
},[])
  return (
    <>
      <div className='about'>
          <div className=' head'>
              <h4>OUR ROOTS:</h4>
              <p>The start of buymebeer can be traced back to three things — the discovery of a new bar, our curiosity and our entrepreneurial spirit.</p>
          </div>
          <div className=' middle'>
            <p>What we’ve enjoyed the most along our journey is the sense of community within the craft brew scene.</p>
            <p>Not many products can bring people together of different nationalities, age groups, religious beliefs, income levels, political views – and even fellow brewers!</p>
            <p>And create a moment of common ground.  8 one 8 Brewing is proud to offer a product that brings us together to say cheers</p>
          </div>
          <div className=' foot'>
              <h4>The Brewery:</h4>
              <p>buymebeer was formed on Janaury 1,2024</p>
          </div>
      </div>
    </>
  )
}
