import { createContext, useContext, useState } from "react";



const FilterContextApi = createContext();
export const useFilterContextApi = ()=>useContext(FilterContextApi);

export default function FilterContextFunc({children}){
  const [filters,setFilters] = useState({
    price_range:[],
    alcohol_content:[],
    category_content:[],
    glasses_content:[],
    ingredients_content:[],
    rating_content:[]
  })


  return(
    <FilterContextApi.Provider
      value={{
        filters,setFilters
      }}
    >
      {children}
    </FilterContextApi.Provider>
  )
}
