import { createContext, useContext, useState } from "react";
import { BeersContext, useBeerContextApi } from "./beerContextApi";



const cartContextApi = createContext()
export const useCartContextApi = ()=>useContext(cartContextApi);

export default function CartContextFunc({children}){
  const [cartItems,setCartItems] = useState([]);
  const {data} = useBeerContextApi();

  const addToCart = async(id)=>{
    let isExist = cartItems.find(cartItem=>cartItem.item.idDrink===id)
    if(isExist){
        setCartItems(prevCartItems=>
            prevCartItems.map(cartItem=>cartItem.item.idDrink===id ? {...cartItem,quantity:cartItem.quantity + 1} : cartItem)    
        )
    }else{
        // let response = await axios.get(`www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        // let response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        // .then(res=>res.data)
        let isExist = data.find(cartItem=>cartItem.idDrink===id)

        let newItem = {
            quantity:1,
            item:isExist
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
  return(
    <cartContextApi.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        reduceFromCart,
        increaseToCart,
      }}
    >
      {children}
    </cartContextApi.Provider>
  )
}