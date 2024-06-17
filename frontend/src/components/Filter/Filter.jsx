import React, { useContext } from 'react';
import './filter.scss';
import { BeersContext, useBeerContextApi } from '../../context/beerContextApi';

export default function Filter() {
  const {filter,setFilter} = useBeerContextApi();
  return (
    <div className='filterOptions'>
      <div className='filterCategories'>
        <div className='categoryOptions'>
          <ul>
            <li></li>
            <li>Alcohol</li>
            <li>Categories</li>
            <li>Glasses</li>
            <li>Ingridients</li>
          </ul>
        </div>
        <div className='optionNames'>
          <p>contents</p>
        </div>
      </div>
      <button className='applyBtn' onClick={()=>setFilter(false)}>Apply</button>
    </div>
  )
}
