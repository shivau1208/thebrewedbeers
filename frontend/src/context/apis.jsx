import { createContext, useContext } from "react";

export const BeersContext = createContext(null);
export const FilterContext = createContext(null);
export const CartContext = createContext(null);
export const useBeerContextApi = () => useContext(BeersContext);
export const useFilterContextApi = () => useContext(FilterContext);
export const useCartContextApi = () => useContext(CartContext);

