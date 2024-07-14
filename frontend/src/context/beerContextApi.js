import { createContext, useContext, useEffect, useState } from "react";
import React from 'react'


const BeersContext = createContext()
export const useBeerContextApi = ()=>useContext(BeersContext);

export default function BeerContextFunc({children}) {
    const [searchComp,setSearchComp] = useState(true)
    const [cartComp,setCartComp] = useState(true)
    const [data,setData] = useState([]);
    const [products,setProducts] = useState([]);
    const [filters,setFilters] = useState({
        price_range:[],
        alcohol_content:[],
        category_content:[],
        glases_content:[],
        ingredients_content:[],
        rating_content:[]
      })
    // const [isDarkMode,setDarkMode] = useState(true)
    useEffect(()=>{
        const fetchData = async () => {
            const res = await fetch('/user-data.json')
            const response = await res.json();
            // console.log(response);
            // const response1 = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink')
            //     .then(res => res.data);
            // const response2 = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
            //     .then(res => res.data);
            // setData(prevData=>[...prevData,...response1.drinks,...response2.drinks])
            setData(prevData=>[...prevData,...response])
            setProducts(prevData=>[...prevData,...response])
        }
        fetchData();
    },[])
    
    // const toggleTheme = ()=>{
    //     setDarkMode((prevState)=>!prevState)
    // }

    // const theme = isDarkMode ? 'dark' : 'light'
    // useEffect(()=>{
    //     document.documentElement.setAttribute('data-theme',theme)
    // },[isDarkMode])
    const Debounce = (func,delay)=>{
        let debounceTimer;
        return function(){
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(()=>func.apply(context,args),delay)
        }
    }
    async function hanldeBeerSearch(){
        let searchInput = document.querySelector('#searchInput');
        let value = searchInput ? searchInput.value : 'a';
        let response = await fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${value}`).then(res=>res.json());
        setData(response?.drinks)
    }
    
    
  return (
    <BeersContext.Provider value={{
        data,setData,
        searchComp,setSearchComp,
        cartComp,setCartComp,
        filters,setFilters,
        products,setProducts,
        Debounce,
        hanldeBeerSearch,
    }}>
        {children}
    </BeersContext.Provider>
  )
}
