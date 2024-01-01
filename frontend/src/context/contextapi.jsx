import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from 'react'


export const BeersContext = createContext()

export default function Contextapi({children}) {
    const [show,setShow] = useState(true)
    const [cartItems,setCartItems] = useState([{
        quantity:1,
        item:{
                "id": 1,
                "name": "Buzz",
                "tagline": "A Real Bitter Experience.",
                "first_brewed": "09/2007",
                "description": "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
                "image_url": "https://images.punkapi.com/v2/keg.png",
                "abv": 4.5,
                "ibu": 60,
                "target_fg": 1010,
                "target_og": 1044,
                "ebc": 20,
                "srm": 10,
                "ph": 4.4,
                "attenuation_level": 75,
                "volume": {
                    "value": 20,
                    "unit": "litres"
                },
                "boil_volume": {
                    "value": 25,
                    "unit": "litres"
                },
                "method": {
                    "mash_temp": [
                        {
                            "temp": {
                                "value": 64,
                                "unit": "celsius"
                            },
                            "duration": 75
                        }
                    ],
                    "fermentation": {
                        "temp": {
                            "value": 19,
                            "unit": "celsius"
                        }
                    },
                    "twist": null
                },
                "ingredients": {
                    "malt": [
                        {
                            "name": "Maris Otter Extra Pale",
                            "amount": {
                                "value": 3.3,
                                "unit": "kilograms"
                            }
                        },
                        {
                            "name": "Caramalt",
                            "amount": {
                                "value": 0.2,
                                "unit": "kilograms"
                            }
                        },
                        {
                            "name": "Munich",
                            "amount": {
                                "value": 0.4,
                                "unit": "kilograms"
                            }
                        }
                    ],
                    "hops": [
                        {
                            "name": "Fuggles",
                            "amount": {
                                "value": 25,
                                "unit": "grams"
                            },
                            "add": "start",
                            "attribute": "bitter"
                        },
                        {
                            "name": "First Gold",
                            "amount": {
                                "value": 25,
                                "unit": "grams"
                            },
                            "add": "start",
                            "attribute": "bitter"
                        },
                        {
                            "name": "Fuggles",
                            "amount": {
                                "value": 37.5,
                                "unit": "grams"
                            },
                            "add": "middle",
                            "attribute": "flavour"
                        },
                        {
                            "name": "First Gold",
                            "amount": {
                                "value": 37.5,
                                "unit": "grams"
                            },
                            "add": "middle",
                            "attribute": "flavour"
                        },
                        {
                            "name": "Cascade",
                            "amount": {
                                "value": 37.5,
                                "unit": "grams"
                            },
                            "add": "end",
                            "attribute": "flavour"
                        }
                    ],
                    "yeast": "Wyeast 1056 - American Ale™"
                },
                "food_pairing": [
                    "Spicy chicken tikka masala",
                    "Grilled chicken quesadilla",
                    "Caramel toffee cake"
                ],
                "brewers_tips": "The earthy and floral aromas from the hops can be overpowering. Drop a little Cascade in at the end of the boil to lift the profile with a bit of citrus.",
                "contributed_by": "Sam Mason <samjbmason>"
            },
        }
    ])
    const [data,setData] = useState([])
    const [itemCount,setItemCount] = useState(0)
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

  return (
    <BeersContext.Provider value={{
        data:data,
        itemCount:itemCount,
        addToCart:addToCart,
        removeFromCart:removeFromCart,
        reduceFromCart:reduceFromCart,
        increaseToCart:increaseToCart,
        cartItems:cartItems,
        show:show,
        setShow:setShow,
    }}>
        {children}
    </BeersContext.Provider>
  )
}
