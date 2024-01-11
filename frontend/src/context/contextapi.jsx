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
        const response = await axios.get('https://api.punkapi.com/v2/beers')
            .then(res => res.data)
        setData(response)
    }
    useEffect(()=>{
        fetchData()
    },[])
    const addToCart = async(id)=>{
        let isExist = cartItems.find(cartItem=>cartItem.item.id===id)
        if(isExist){
            setCartItems(prevCartItems=>
                prevCartItems.map(cartItem=>cartItem.item.id===id ? {...cartItem,quantity:cartItem.quantity + 1} : cartItem)    
            )
        }else{
            let response = await axios.get(`https://api.punkapi.com/v2/beers/${id}`)
            .then(res=>res.data)
            let newItem = {
                quantity:1,
                item:response[0]
            }
            setCartItems(()=>[...cartItems,newItem])
        }
    }
    const removeFromCart = async(id)=>{
        let filteredItems = cartItems.filter((i,index)=>i.item.id !==id)
        setCartItems(filteredItems)
    }
    const increaseToCart = async(id)=>{
        setCartItems(prevCartItems=>
            prevCartItems.map((cartItem)=>cartItem.item.id===id ? {...cartItem,quantity:cartItem.quantity + 1} : cartItem)
        )
    }
    
    const reduceFromCart = async(id)=>{
        setCartItems(prevCartItems=>
            prevCartItems.map(cartItem=>cartItem.item.id===id ? {...cartItem,quantity:cartItem.quantity === 0 ? 0 : cartItem.quantity - 1} : cartItem)    
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
