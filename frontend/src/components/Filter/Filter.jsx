<<<<<<< HEAD
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
=======
import React, { useContext, useEffect, useState } from 'react';
import './filter.scss';
import {useBeerContextApi } from '../../context/beerContextApi';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { alcoholContent, categoriesContent, glasesContent, ingredientsContent, priceRange, ratingContent } from '../../constants/filterConstants';

const Filter_route = styled.div`
  height:100%;
  max-height:100dvh;

`
const FilterBackBtnParent = styled.div`
  height:50px;
  display:flex;
  align-items:center;
  justify-content:start
`
const FilterBackBtn = styled.button`
  border: none;
  outline: none;
  padding: 0.7rem 0.6rem;
  margin-right: 1rem;
  background-color: transparent;
  height: 100%;
  
`
const FilterHeaderSpan = styled.span`

`
const FilterOptions = styled.div`
  background-color: #fff;
  display: grid;
  grid-template-columns: 1fr 2fr;
  min-height: 100%;
  height: calc(100dvh - 100px);
`
const CategoryOptions = styled.div`
  background-color: #E1F3EB;
`
const FilterCategoryList = styled.li`
  display:flex;
  justify-content:space-between;
  align-items:center;
  list-style: none;
  padding: 0.4rem;
  font-size: 17px;
  font-weight: 400;
`
const FilterCategoryLength = styled.span`
    width: 18px;
    height: 19px;
    border-radius: 50%;
    font-size: 13px;
    text-align: center;
    background-color: #0075FF;
    color: #fff;
`
const OptionNames = styled.div`

`
const Options = styled.div`
  display: flex;
  margin-left: 1rem;
  height: 35px;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
`
const OptionsList = styled.li`
  list-style:none;
  padding:0 0.5rem;
  margin-left:0.3rem;
`
const ApplyBtnParent = styled.div`
  height:60px;
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.8rem;
  margin-bottom:0.4rem;
  box-shadow: 0 0 4px #000;
  background-color: #fff;
`
const ClearFiletrsBtn = styled.button`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #000;
  outline: none;
  background-color: #fff;
  margin-bottom: 0.5rem;
  color: #000;
  `
  const ApplyBtn = styled.button`
  padding: 0.5rem 1.5rem;
  margin-bottom: 0.5rem;
  border-radius: 5px;
  border: none;
  outline: none;
  background-color: #FB641B;
  color:#fff;
`


export default function Filter() {
  const navigate = useNavigate();
  const {filters,setFilters,products,setProducts} = useBeerContextApi();
  const [options,setOPtions] = useState([...priceRange])
  const [category,setCategory] = useState('price_range')
  const [checked,setChecked] = useState(false)

  function SetActiveFilterTab() {
    let list = document.querySelectorAll('.filterlist');
    list.forEach((item, index) => {
      item.addEventListener('click', function (event) {
        list.forEach((listitem, index) => {
          listitem.classList.remove('activefilter');
        });
        event.currentTarget.classList.add('activefilter');
      });
    });
  }
  const FilterOptionOnChangehandler = (category,value)=>{
    setFilters((prevfilters)=>{
      let newValues = prevfilters[category].includes(value) ? prevfilters[category].filter((item)=>item!==value) : [...prevfilters[category],value]
      return {
        ...prevfilters,
        [category]:newValues
      }
    })
  };
  const ClearFilterhandler = ()=>{
    let newValues = {}
    for(let key in filters){
      if(filters.hasOwnProperty(key)){
        newValues[key]=[];
      }
    }
    setFilters(newValues)
  }
  const ApplyFilterhandler = ()=>{
    let priceMin=null
    let priceMax = null;
    let ratingMin =null;
    try{
      let numbers = filters.price_range?.length ? filters.price_range.flatMap(range=>range.split('-').map(Number)) : null;
      
      if(numbers){
        priceMax = Math.max(...numbers);
        priceMin = Math.min(...numbers);
      }
      ratingMin = filters.rating_content?.length ? Math.max(...filters.rating_content) : null;
    }catch(err){
      console.log(err);
    }
    const filteredProducts = products.filter((product,index)=>{
      let price = product?.price;
      let rating = product?.rating;
      return (
        (filters.alcohol_content.length===0 || filters.alcohol_content.includes(product?.strAlcoholic)) &&
        (filters.category_content.length===0 || filters.category_content.includes(product?.strCategory)) &&
        (filters.glases_content.length===0 || filters.glases_content.includes(product?.strCategory)) &&
        (filters.ingredients_content.length===0 || filters.ingredients_content.includes(product?.strIngredient1)) &&
        ((priceMin===null || price >= priceMin) && (priceMax===null  || price <= priceMax)) && 
        (ratingMin===null || rating >= ratingMin)
      )
    })
    setProducts(filteredProducts);
    navigate('/beers')
  }
  useEffect(()=>{
    SetActiveFilterTab();
  },[])
  return (
    <>
      <Filter_route>
        <FilterBackBtnParent>
          <FilterBackBtn onClick={()=>navigate(-1)}>
              <img src="/back-btn.svg" alt="go back" srcSet="" />
          </FilterBackBtn>
          <FilterHeaderSpan>Filters</FilterHeaderSpan>
        </FilterBackBtnParent>
        <FilterOptions>
            <CategoryOptions>
              <ul>
                <FilterCategoryList key={'Price'} onClick={()=>{setOPtions([...priceRange]);setCategory('price_range')}} className='filterlist activefilter'><span>Price</span> {filters.price_range.length ? <FilterCategoryLength>{filters.price_range.length}</FilterCategoryLength> : null}</FilterCategoryList>
                <FilterCategoryList key={'Alcohol'} onClick={()=>{setOPtions([...alcoholContent]);setCategory('alcohol_content')}} className='filterlist'><span>Alcohol</span> {filters.alcohol_content.length ? <FilterCategoryLength>{filters.alcohol_content.length}</FilterCategoryLength> : null}</FilterCategoryList>
                <FilterCategoryList key={'Categories'} onClick={()=>{setOPtions([...categoriesContent]);setCategory('category_content')}} className='filterlist'><span>Categories</span>{filters.category_content.length ? <FilterCategoryLength>{filters.category_content.length}</FilterCategoryLength> : null}</FilterCategoryList>
                <FilterCategoryList key={'Glasses'} onClick={()=>{setOPtions([...glasesContent]);setCategory('glases_content')}} className='filterlist'><span>Glasses</span>{filters.glases_content.length ? <FilterCategoryLength>{filters.glases_content.length}</FilterCategoryLength> : null}</FilterCategoryList>
                <FilterCategoryList key={'Ingridients'} onClick={()=>{setOPtions([...ingredientsContent]);setCategory('ingredients_content')}} className='filterlist'><span>Ingridients</span>{filters.ingredients_content.length ? <FilterCategoryLength>{filters.ingredients_content.length}</FilterCategoryLength> : null}</FilterCategoryList>
                <FilterCategoryList key={'Rating'} onClick={()=>{setOPtions([...ratingContent]);setCategory('rating_content')}} className='filterlist'><span>Rating</span>{filters.rating_content.length ? <FilterCategoryLength>{filters.rating_content.length}</FilterCategoryLength> : null}</FilterCategoryList>
              </ul>
            </CategoryOptions>
            <OptionNames>
              {options.map(({id,name,value},index)=>
                <Options key={id} onClick={()=>FilterOptionOnChangehandler(category,value)}>
                  <img src={filters[category].includes(value) ? '/checkbox-checked.svg':'/checkbox.svg'} alt="" srcSet="" />
                  <OptionsList>{name}</OptionsList>
                </Options>
              )}
            </OptionNames>
        </FilterOptions>
        <ApplyBtnParent>
          <ClearFiletrsBtn onClick={()=>ClearFilterhandler()}>Clear Filetrs</ClearFiletrsBtn>
          <ApplyBtn onClick={()=>ApplyFilterhandler()}>Apply</ApplyBtn>
        </ApplyBtnParent>
      </Filter_route>
    </>
>>>>>>> 885121f (Added filter feature to Beers route)
  )
}
