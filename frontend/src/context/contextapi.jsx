import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";
import React from 'react'


export const BeersContext = createContext()

export default function Contextapi({children}) {
    const [show,setShow] = useState(true)
    const [cartItems,setCartItems] = useState([])
    const [data,setData] = useState([])
    // const [isDarkMode,setDarkMode] = useState(true)
    const fetchData = async () => {
        // const response = await axios.get('https://api.punkapi.com/v2/beers')
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin')
            .then(res => res.data);
        setData(response.drinks)
    }
    useEffect(()=>{
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

  return (
    <BeersContext.Provider value={{
        data,
        addToCart,
        removeFromCart,
        reduceFromCart,
        increaseToCart,
        cartItems,
        show,
        setShow,
    }}>
        {children}
    </BeersContext.Provider>
  )
}
