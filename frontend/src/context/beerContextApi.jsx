import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BeersContext } from "./apis";


export default function BeerContextFunc({ children }) {
  const [searchComp, setSearchComp] = useState(true);
  const [cartComp, setCartComp] = useState(true);
  const [sidebarShow, setSideBarShow] = useState(false);
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [activeItem, setActiveItem] = useState("home"); // Default active item
  const [searchParams] = useSearchParams();
  let searchInput = searchParams.get("q");
  const pathname = location.pathname;
  let tabName = pathname.split("/")[1].toLowerCase();


  const  beer_data = 'https://d3ibff8wnmjbff.cloudfront.net'
  // const [isDarkMode,setDarkMode] = useState(true)
  const fetchData = async () => {
    try{
      const res = await fetch(`${beer_data}/beerdata.json`,{
        headers:{
          "origin":["http://localhost:3000","https://thebrewedbeers.vercel.app"]  
        }
      });
      const response = res.ok ? await res.json() : [];
      setData([...new Set(response)]);
      setProducts((prevData) => [...prevData, ...response]);
    }catch(err){
      console.log('failed to fetch beer data',err);
      
    }
  };
  useEffect(() => {
    fetchData();
  }, [tabName]);

  

  function hanldeBeerSearch() {
    if(typeof searchInput === 'string'){
      let value = searchInput.toLowerCase();
      let response = data.filter((item) => {
        let strDrink = item.strDrink.toLowerCase();
        let ingredient = item.strIngredient1.toLowerCase();
        return strDrink.indexOf(value) > -1 || ingredient.indexOf(value) > -1;
      });
      setProducts([...new Set(response)]);
    }
  }
    // const toggleTheme = ()=>{
  //     setDarkMode((prevState)=>!prevState)
  // }

  // const theme = isDarkMode ? 'dark' : 'light'
  // useEffect(()=>{
  //     document.documentElement.setAttribute('data-theme',theme)
  // },[isDarkMode])

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
        hanldeBeerSearch,
        showProfile,
        setShowProfile,
        sidebarShow,
        setSideBarShow,
        activeItem,
        setActiveItem
      }}
    >
      {children}
    </BeersContext.Provider>
  );
}
