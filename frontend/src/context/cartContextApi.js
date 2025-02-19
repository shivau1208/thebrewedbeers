import { createContext, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import useCartService from "../utils/cart_service";

const cartContextApi = createContext();
export const useCartContextApi = () => useContext(cartContextApi);

export default function CartContextFunc({ children }) {
  const {user} = useSelector(state=>state?.userInfo);
  const localId = user['localId'];
  
  const cartData = JSON.parse(localStorage.getItem("cartItems")) || {};
  const beersInCart = cartData[localId] || []

  
  const { cartItems, addToCart, removeFromCart, reduceFromCart, increaseToCart, cartTotal, clearCart } = useCartService(beersInCart);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify({...cartData,[localId]:cartItems}));
  }, [cartItems]);
  return (
    <cartContextApi.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        reduceFromCart,
        increaseToCart,
        cartTotal,
        clearCart,
      }}
    >
      {children}
    </cartContextApi.Provider>
  );
}
