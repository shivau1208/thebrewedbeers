import { createContext, useContext, useEffect } from "react";
import useCartService from "cartservice";

const cartContextApi = createContext();
export const useCartContextApi = () => useContext(cartContextApi);

export default function CartContextFunc({ children }) {
  const { cartItems, addToCart, removeFromCart, reduceFromCart, increaseToCart, cartTotal, clearCart } = useCartService(() => {
    // Initialize cart from localStorage, or with an empty array if nothing is stored
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
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
