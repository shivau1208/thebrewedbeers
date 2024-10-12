import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

const BeersContext = createContext();
export const useBeerContextApi = () => useContext(BeersContext);

export default function BeerContextFunc({ children }) {
  const [searchComp, setSearchComp] = useState(true);
  const [cartComp, setCartComp] = useState(true);
  const [sidebarShow, setSideBarShow] = useState(false);
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  // const [isDarkMode,setDarkMode] = useState(true)
  const fetchData = async () => {
    const res = await fetch("/user-data.json");
    const response = await res.json();
    // console.log(response);
    // const response1 = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink')
    //     .then(res => res.data);
    // const response2 = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
    //     .then(res => res.data);
    // setData(prevData=>[...prevData,...response1.drinks,...response2.drinks])
    setData((prevData) => [...prevData, ...response]);
    setProducts((prevData) => [...prevData, ...response]);
  };
  useEffect(() => {
    fetchData();
  }, []);

  // const toggleTheme = ()=>{
  //     setDarkMode((prevState)=>!prevState)
  // }

  // const theme = isDarkMode ? 'dark' : 'light'
  // useEffect(()=>{
  //     document.documentElement.setAttribute('data-theme',theme)
  // },[isDarkMode])
  const Debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };
  async function hanldeBeerSearch() {
    let searchInput = document.querySelector("#searchInput");
    let value = searchInput.value.toLowerCase();
    let response = data.filter((item) => {
      let strDrink = item.strDrink.toLowerCase();
      let ingredient = item.strIngredient1.toLowerCase();
      return strDrink.indexOf(value) > -1 || ingredient.indexOf(value) > -1;
    });
    setProducts([...response]);
  }

  return (
    <BeersContext.Provider
      value={{
        data,
        setData,
        searchComp,
        setSearchComp,
        cartComp,
        setCartComp,
        products,
        setProducts,
        Debounce,
        hanldeBeerSearch,
        showProfile,
        setShowProfile,
        sidebarShow,
        setSideBarShow,
      }}
    >
      {children}
    </BeersContext.Provider>
  );
}
