import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import "./navBar.css";
import styled from "styled-components";
import { BeersContext, useBeerContextApi } from "../../context/beerContextApi";
import { Link } from "react-router-dom";
import { useCartContextApi } from "../../context/cartContextApi";
import UserProfile from "../UserProfile/UserProfile";

const Cart = styled.div`
  position: relative;
  cursor: pointer;
  margin: 0 1.5rem;
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

export const AddClass = () => {
  let lis = document.querySelectorAll(".navbarlist");
  let pathname = location.pathname;
  let tabName = pathname.split("/")[1].toLowerCase();
  let tab = document.getElementById(tabName);
  if (tab) {
    tab.classList.add("active");
  }
  for (var i = 0; i < lis.length; i++) {
    lis[i].addEventListener("click", function (e) {
      var current = document.getElementsByClassName("active");
      if (current.length > 0) {
        current[0].classList.remove("active");
      }
      this.classList.add("active");
      // let tabText = this.getAttribute("id").toLocaleLowerCase();
      // localStorage.setItem("activeTab", tabText);
    });
  }
};
export const removeClass = () => {
  let lis = document.querySelectorAll(".navbarlist");
  lis.forEach((li) => (li.className = ""));
};
export default function Navbar() {
  const { cartComp, searchComp, Debounce, hanldeBeerSearch } = useBeerContextApi();
  const [showProfile, setShowProfile] = useState(false);
  const { cartItems } = useCartContextApi();
  const [sidebarShow, setSideBarShow] = useState(false);
  const [clientWidth, setClientWidth] = useState(null);

  useLayoutEffect(() => {
    setClientWidth(document.body.clientWidth);
    let width = document.body.clientWidth;
    if (width <= "768") {
      setSideBarShow(true);
    } else {
      setSideBarShow(false);
    }
  }, []);
  window.addEventListener(
    "resize",
    function (event) {
      setClientWidth(document.body.clientWidth);
      let width = document.body.clientWidth;
      if (width <= "768") {
        setSideBarShow(true);
      } else {
        setSideBarShow(false);
      }
    },
    true
  );

  function Close(e) {
    e.preventDefault();
    let sidebar = document.querySelector(".sidebarTabs");
    if (sidebar) {
      sidebar.style.width = "0px";
      document.querySelector(".overlay").style.display = "none";
      removeClass();
    }
  }
  function MenuIcon() {
    let sidebar = document.querySelector(".sidebarTabs");
    if (sidebar) {
      sidebar.style.width = "200px";
      document.querySelector(".overlay").style.display = "block";
      let pathname = location.pathname;
      let tabName = pathname.split("/")[1].toLowerCase();
      let tab = document.getElementById(tabName);
      if (tab) {
        tab.classList.add("active");
      }
    }
  }

  useEffect(() => {
    AddClass();
  }, [clientWidth]);

  return (
    <>
      {sidebarShow && (
        <>
          <div className="sidebarTabs">
            <div className="close">
              <img src="/close-square-svgrepo-com.svg" alt="close" srcSet="" width="30" onClick={Close} />
            </div>
            <div className="sideList">
              <ul>
                <li className="navbarlist" id="home">
                  <Link to="/home" aria-label="home">
                    Home
                  </Link>
                </li>
                <li className="navbarlist" id="beers">
                  <Link to="/beers" aria-label="beers">
                    Beers
                  </Link>
                </li>
                <li className="navbarlist" id="dining">
                  <Link to="/dining" aria-label="dining">
                    Dining
                  </Link>
                </li>
                <li className="navbarlist" id="about">
                  <Link to="/about" aria-label="about">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="overlay" onClick={(e) => Close(e)}></div>
        </>
      )}
      <div className="navBarWidth">
        <div className="navBar">
          <div className="menuIcon" onClick={MenuIcon}>
            <img src="/menu-alt-1-svgrepo-com.svg" alt="menu" srcSet="" width="35" />
          </div>
          <div className="logo" style={{ cursor: "pointer" }}>
            <Link to={"/home"} aria-label="home">
              <img width="35" src="/beer-mug.svg" alt="logo" />
            </Link>
          </div>
          {searchComp && (
            <div className="searchBar">
              <img width="25" src="/search-svgrepo-com.svg" alt="" srcSet="" />
              <input
                type="text"
                name="searchInput"
                id="searchInput"
                autoComplete="off"
                aria-label="searchInput"
                onKeyUp={Debounce(function () {
                  hanldeBeerSearch();
                }, 300)}
              />
            </div>
          )}
          {!sidebarShow && (
            <div className="navbarTabs">
              <ul className="menuList">
                <li id="home">
                  <Link to="/home" aria-label="home">
                    Home
                  </Link>
                </li>
                <li id="beers">
                  <Link to="/beers" aria-label="beers">
                    Beers
                  </Link>
                </li>
                <li id="dining">
                  <Link to="/dining" aria-label="dining">
                    Dining
                  </Link>
                </li>
                <li id="about">
                  <Link to="/about" aria-label="about">
                    About
                  </Link>
                </li>
                {/* {searchComp && <Link to="#"><li className='orderOnline'>Order Online</li></Link>} */}
              </ul>
            </div>
          )}
          {cartComp && (
            <Link to="/cartitems" aria-label="cartItems">
              <Cart className="cart" onClick={() => removeClass()}>
                <img width="35" src="/cart-large-minimalistic-svgrepo-com.svg" alt="" srcSet="" />
                {cartItems.length ? <CartItems>{cartItems.length}</CartItems> : ""}
              </Cart>
            </Link>
          )}
          {/* <div onClick={()=>toggleTheme()}>
                {theme ? <div className='theme'><img src="/sun-svgrepo-com.svg" alt="darkTheme" srcSet="" width='30' /></div> : <div className='theme'><img src="/moon-svgrepo-com.svg" alt="darkTheme" srcSet="" width='30' /></div>}
          </div> */}
          <div className="account">
            <div className="profilePic" onClick={() => setShowProfile(!showProfile)}>
              <img width="35" src="/user-circle-svgrepo-com.svg" alt="external-user-circle-users-dashed-line-kawalan-studio" />
            </div>
            {showProfile && <UserProfile />}
          </div>
        </div>
      </div>
    </>
  );
}
