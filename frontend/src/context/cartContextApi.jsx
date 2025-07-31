import { useEffect } from "react";
import { useSelector } from "react-redux";
import useCartService from "@/utils/cart_service";
import { CartContext } from "./apis";


export default function CartContextFunc({ children }) {
  const {user} = useSelector(state=>state?.userInfo);
  const userId = user && user['userId'] || "john";
  
  const cartData = JSON.parse(localStorage.getItem("cartItems")) || {};
  
  const beersInCart = cartData[userId];
  
  const { cartItems, addToCart, removeFromCart, reduceFromCart, increaseToCart, cartTotal, clearCart } = useCartService(beersInCart);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify({...cartData,[userId]:cartItems}));
  }, [cartItems]);
  return (
    <CartContext.Provider
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
    </CartContext.Provider>
  );
}
