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

  const  beer_data = 'https://d3ibff8wnmjbff.cloudfront.net'
  // const [isDarkMode,setDarkMode] = useState(true)
  const fetchData = async () => {
    try{
      const res = await fetch(`${beer_data}/beerdata.json`,{
        headers:{
          "origin":"https://d3ibff8wnmjbff.cloudfront.net"
        }
      });
      const response = await res.json();
      setData((prevData) => [...prevData, ...response]);
      setProducts((prevData) => [...prevData, ...response]);
    }catch(err){
      console.log('failed to fetch beer data',err);
      
    }
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
