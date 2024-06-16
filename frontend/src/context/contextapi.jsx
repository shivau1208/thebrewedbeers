import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";
import React from 'react'


export const BeersContext = createContext()

export default function Contextapi({children}) {
    const [searchComp,setSearchComp] = useState(true)
    const [cartItems,setCartItems] = useState([])
    const [data,setData] = useState([]);
    const [filter,setFilter] = useState(false);
    // const [isDarkMode,setDarkMode] = useState(true)
    useEffect(()=>{
        const fetchData = async () => {
            // const response = await axios.get('https://api.punkapi.com/v2/beers')
            const response1 = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink')
                .then(res => res.data);
            const response2 = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
                .then(res => res.data);
            setData(prevData=>[...prevData,...response1.drinks,...response2.drinks])
        }
        fetchData()
    },[])
    const addToCart = async(id)=>{
        let isExist = cartItems.find(cartItem=>cartItem.item.idDrink===id)
        if(isExist){
            setCartItems(prevCartItems=>
                prevCartItems.map(cartItem=>cartItem.item.idDrink===id ? {...cartItem,quantity:cartItem.quantity + 1} : cartItem)    
            )
        }else{
            // let response = await axios.get(`www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            let response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(res=>res.data)
            let newItem = {
                quantity:1,
                item:response?.drinks[0]
            }
            setCartItems(()=>[...cartItems,newItem])
        }
    }
    const removeFromCart = async(id)=>{
        let filteredItems = cartItems.filter((cartItem,index)=>cartItem.item.idDrink !==id)
        setCartItems(filteredItems)
    }
    const increaseToCart = async(id)=>{
        setCartItems(prevCartItems=>
            prevCartItems.map((cartItem)=>cartItem.item.idDrink===id ? {...cartItem,quantity:cartItem.quantity + 1} : cartItem)
        )
    }
    
    const reduceFromCart = async(id)=>{
        setCartItems(prevCartItems=>
            prevCartItems.map(cartItem=>cartItem.item.idDrink===id ? {...cartItem,quantity:cartItem.quantity === 0 ? 0 : cartItem.quantity - 1} : cartItem)    
        )
    }
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
        data,
        addToCart,
        removeFromCart,
        reduceFromCart,
        increaseToCart,
        cartItems,
        searchComp,
        setSearchComp,
        setData,
        Debounce,
        hanldeBeerSearch,
        filter,setFilter
        
    }}>
        {children}
    </BeersContext.Provider>
  )
}
