import React, { useEffect, useLayoutEffect, useState } from "react";
import "./navBar.css";
import styled from "styled-components";
import { useBeerContextApi } from "../../context/beerContextApi";
import { Link } from "react-router-dom";
import { useCartContextApi } from "../../context/cartContextApi";
import UserProfile from "../../pages/UserProfile/UserProfile";
import { useSelector } from "react-redux";

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

export const AddClassToList = () => {
  let sideBarList = document.querySelectorAll(".sidebarlist");
  let navBarList = document.querySelectorAll(".navbarTabs p");
  let pathname = location.pathname;
  let tabName = pathname.split("/")[1].toLowerCase();
  let tab = document.getElementById(tabName);
  if (tab) {
    tab.classList.add("active");
  }
  sideBarList.forEach((li, index) => {
    li.addEventListener("click", function (e) {
      e.stopPropagation();
      sideBarList.forEach((ele) => {
        ele.classList.remove("active");
      });
      li.classList.add("active");
    });
  });
  navBarList.forEach((li, index) => {
    li.addEventListener("click", function (e) {
      e.stopPropagation();
      navBarList.forEach((ele) => {
        ele.classList.remove("active");
      });
      li.classList.add("active");
    });
  });
};
export const removeClass = () => {
  let lis = document.querySelectorAll(".sidebarlist");
  let sidebar = document.querySelector(".sidebarTabs");
  lis.forEach((li) => {
    li.className = "";
    // if(sidebar){
    //   sidebar.style.width = "0px";
    //   document.querySelector(".overlay").style.display = "none";
    // }
  });
};
export default function Navbar() {
  const { cartComp, searchComp, Debounce, hanldeBeerSearch, sidebarShow, setSideBarShow } = useBeerContextApi();
  const [showProfile, setShowProfile] = useState(false);
  const { cartItems } = useCartContextApi();
  const [clientWidth, setClientWidth] = useState(null);
  const {user} = useSelector(state => state?.userInfo);
  const photoUrl = user?.photoUrl;

  useLayoutEffect(() => {
    setClientWidth(document.body.clientWidth);
    let width = document.body.clientWidth;
    if (width <= "768") {
      setSideBarShow(true);
    } else {
      setSideBarShow(false);
    }
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
  }, []);

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
    AddClassToList();
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
              <div>
                <Link to="/home" aria-label="home">
                  <p className="sidebarlist" id="home">
                    Home
                  </p>
                </Link>
                <Link to="/beers" aria-label="beers">
                  <p className="sidebarlist" id="beers">
                    Beers
                  </p>
                </Link>
                <Link to="/dining" aria-label="dining">
                  <p className="sidebarlist" id="dining">
                    Dining
                  </p>
                </Link>
                <Link to="/about" aria-label="about">
                  <p className="sidebarlist" id="about">
                    About
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="overlay" onClick={(e) => Close(e)}></div>
        </>
      )}
      <div className="navBarWidth">
        <div className="navBar">
          <div className="menuIcon" onClick={MenuIcon}>
            <img src="/menu-alt-1-svgrepo-com.svg" alt="menu" srcSet="" width="35" height="35" />
          </div>
          <div className="logo" style={{ cursor: "pointer" }}>
            <Link to={"/home"} aria-label="home">
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
                onKeyUp={Debounce(function () {
                  hanldeBeerSearch();
                }, 300)}
              />
            </div>
          )}
          {!sidebarShow && (
            <div className="navbarTabs">
              <div className="menuList">
                <Link to="/home" aria-label="home">
                  <p id="home">Home</p>
                </Link>
                <Link to="/beers" aria-label="beers">
                  <p id="beers">Beers</p>
                </Link>
                <Link to="/dining" aria-label="dining">
                  <p id="dining">Dining</p>
                </Link>
                <Link to="/about" aria-label="about">
                  <p id="about">About</p>
                </Link>
                {/* {searchComp && <Link to="#"><li className='orderOnline'>Order Online</li></Link>} */}
              </div>
            </div>
          )}
          {cartComp && (
            <Cart className="cart" onClick={() => removeClass()}>
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

            <div className="profilePic" onClick={() => setShowProfile(!showProfile)}>
              <img src={photoUrl ? photoUrl :"/user-circle-svgrepo-com.svg"} alt="profile pic" />
            </div>
            {showProfile && <UserProfile />}
          </div>
        </div>
      </div>
    </>
  );
}
