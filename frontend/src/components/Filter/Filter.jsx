import React, { useContext } from 'react';
import './filter.scss';
import { BeersContext } from '../../context/contextapi';

export default function Filter() {
  const {filter,setFilter} = useContext(BeersContext)
  return (
    <div className='filterOptions'>
      Filter
      <button className='applyBtn' onClick={()=>setFilter(false)}>Apply</button>
    </div>
  )
}
