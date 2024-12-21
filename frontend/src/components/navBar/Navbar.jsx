import React, { useEffect, useState } from "react";
import "./navBar.css";
import styled from "styled-components";
import { useBeerContextApi } from "../../context/beerContextApi";
import { Link, useNavigate } from "react-router-dom";
import { useCartContextApi } from "../../context/cartContextApi";
import UserProfile from "../../pages/UserProfile/UserProfile";
import { useSelector } from "react-redux";
import { Debounce } from "../../utils/categorisedBeers";

const Cart = styled.div`
  position: relative;
  cursor: pointer;
  margin: 0 1.5rem;
  height: 35px;
`;
const CartItems = styled.span`
  position: absolute;
  top: -0.2rem;
  right: -0.7rem;
  width: 1.6rem;
  height: 1.6rem;
  border: 0.1rem solid;
  border-radius: 50%;
  color: #000;
  background: #fff;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Navbar() {
  const { cartComp, searchComp, hanldeBeerSearch,activeItem, setActiveItem } = useBeerContextApi();
  const [showProfile, setShowProfile] = useState(false);
  const { cartItems } = useCartContextApi();
  const { user } = useSelector((state) => state?.userInfo);
  const navigate = useNavigate()
  const photoUrl = user?.photoUrl;
  const pathname = location.pathname;
  let tabName = pathname.split("/")[1].toLowerCase();

  function Close(e) {
    e.preventDefault();
    let sidebar = document.querySelector(".sidebarTabs");
    if (sidebar) {
      sidebar.classList.remove("open");
      document.querySelector(".overlay").classList.remove("visible");
    }
  }
  function MenuIcon() {
    let sidebar = document.querySelector(".sidebarTabs");
    if (sidebar) {
      sidebar.classList.add("open");
      document.querySelector(".overlay").classList.add("visible");
    }
  }
  const searchKeyUp = Debounce(function (event) {
      let query = event.target.value.trim();
      if(query){
        navigate(`/search?q=${query}`)
        hanldeBeerSearch();
      }
    }, 500)
  useEffect(() => {
    setActiveItem(tabName);
  }, [tabName]);

  return (
    <>
      <div className="sidebarTabs">
        <div className="close">
          <img src="/close-square-svgrepo-com.svg" alt="close" srcSet="" width="35" height="35" onClick={Close} />
        </div>
        <div className="sideList">
            <Link to={"/home"} aria-label="home" className={`sidebarlist ${activeItem == "home" ? "active" : ""}`} onClick={() => setActiveItem("home")}>
              Home
            </Link>
            <Link to={"/beers"} aria-label="beers" className={`sidebarlist ${activeItem == "beers" ? "active" : ""}`} onClick={() => setActiveItem("beers")}>
              Beers
            </Link>
            <Link to={"/dining"} aria-label="dining" className={`sidebarlist ${activeItem == "dining" ? "active" : ""}`} onClick={() => setActiveItem("dining")}>
              Dining
            </Link>
            <Link to={"/about"} aria-label="about" className={`sidebarlist ${activeItem == "about" ? "active" : ""}`} onClick={() => setActiveItem("about")}>
              About
            </Link>
        </div>
      </div>
      <div className="overlay" onClick={(e) => Close(e)}></div>
      <div className="navBarWidth">
        <div className="navBar">
          <div className="menuIcon" onClick={MenuIcon}>
            <img src="/menu-alt-1-svgrepo-com.svg" alt="menu" srcSet="" width="35" height="35" />
          </div>
          <div className="logo" style={{ cursor: "pointer" }}>
            <Link to={"/home"} aria-label="home" onClick={() => setActiveItem("home")}>
              <img src="/beer-mug.svg" alt="logo" />
            </Link>
          </div>
          {searchComp && (
            <div className="searchBar">
              <img src="/search-svgrepo-com.svg" alt="" srcSet="" />
              <input
                type="text"
                name="searchInput"
                id="searchInput"
                autoComplete="off"
                aria-label="searchInput"
                onKeyUp={searchKeyUp}
              />
            </div>
          )}
          <div className="navbarTabs">
            <div className="menuList">
              <Link to={"/home"} aria-label="home" onClick={() => setActiveItem("home")} className={`${activeItem == "home" ? "active" : ""}`}>
                Home
              </Link>
              <Link to={"/beers"} aria-label="beers" onClick={() => setActiveItem("beers")} className={`${activeItem == "beers" ? "active" : ""}`}>
                Beers
              </Link>
              <Link to={"/dining"} aria-label="dining" onClick={() => setActiveItem("dining")} className={`${activeItem == "dining" ? "active" : ""}`}>
                Dining
              </Link>
              <Link to={"/about"} aria-label="about" onClick={() => setActiveItem("about")} className={`${activeItem == "about" ? "active" : ""}`}>
                About
              </Link>
              {/* {searchComp && <Link to="#"><li className='orderOnline'>Order Online</li></Link>} */}
            </div>
          </div>
          {cartComp && (
            <Cart className="cart">
              <Link to="/cartitems" aria-label="cartItems">
                <img src="/cart-large-minimalistic-svgrepo-com.svg" alt="" srcSet="" />
                {cartItems.length ? <CartItems>{cartItems.length}</CartItems> : ""}
              </Link>
            </Cart>
          )}
          {/* <div onClick={()=>toggleTheme()}>
                {theme ? <div className='theme'><img src="/sun-svgrepo-com.svg" alt="darkTheme" srcSet="" width='30' /></div> : <div className='theme'><img src="/moon-svgrepo-com.svg" alt="darkTheme" srcSet="" width='30' /></div>}
          </div> */}
          <div className="account">
            {showProfile && <div className="profileOverlay" onClick={() => setShowProfile(false)}></div>}
            <div className="profilePic" onClick={() => setShowProfile(!showProfile)}>
              <img src={photoUrl ? photoUrl : "/user-circle-svgrepo-com.svg"} alt="profile pic" />
            </div>
            {showProfile && <UserProfile />}
          </div>
        </div>
      </div>
    </>
  );
}
