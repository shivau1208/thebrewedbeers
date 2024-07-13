import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import "./navBar.css";
import styled from "styled-components";
import { BeersContext, useBeerContextApi } from "../../context/beerContextApi";
import { Link } from "react-router-dom";
import { useCartContextApi } from "../../context/cartContextApi";

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
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;

export const AddClass = () => {
  let lis = document.querySelectorAll("li");
  let pathname = location.pathname;
  let tabName = pathname.split("/")[1].toLowerCase();
  let tab = document.getElementById(tabName);
  if (tab) {
    tab.classList.add("active");
  }
  // else{
  //     lis[0].classList.add('active')
  //     let firsttabText = lis[0].getAttribute('id').toLocaleLowerCase();
  //     localStorage.setItem('activeTab',firsttabText);
  // }
  for (var i = 0; i < lis.length; i++) {
    lis[i].addEventListener("click", function (e) {
      var current = document.getElementsByClassName("active");
      if (current.length > 0) {
        current[0].classList.remove("active");
      }
      this.classList.add("active");
      let tabText = this.getAttribute("id").toLocaleLowerCase();
      localStorage.setItem("activeTab", tabText);
    });
  }
};
export const removeClass = () => {
  let lis = document.querySelectorAll("li");
  lis.forEach((li) => (li.className = ""));
};
export default function Navbar() {
  const { cartComp, searchComp, Debounce, hanldeBeerSearch } = useBeerContextApi();
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
                <Link to="/home">
                  <li id="home">Home</li>
                </Link>
                <Link to="/beers">
                  <li id="beers">Beers</li>
                </Link>
                <Link to="/dining">
                  <li id="dining">Dining</li>
                </Link>
                <Link to="/about">
                  <li id="about">About</li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="overlay" onClick={(e) => Close(e)}></div>
        </>
      )}
      <div className="navBar">
        <div className="menuIcon" onClick={MenuIcon}>
          <img src="/menu-alt-1-svgrepo-com.svg" alt="menu" srcSet="" width="35" />
        </div>
        <div
          className="logo"
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.location.replace(window.location.origin);
          }}
        >
          <img width="35" src="/beer-mug.svg" alt="logo" />
        </div>
        {searchComp && (
          <div className="searchBar">
            <img width="25" src="/search-svgrepo-com.svg" alt="" srcSet="" />
            <input
              type="text"
              name=""
              id="searchInput"
              onKeyUp={Debounce(function () {
                hanldeBeerSearch();
              }, 500)}
            />
          </div>
        )}
        {!sidebarShow && (
          <div className="navbarTabs">
            <ul className="menuList">
              <Link to="/home">
                <li id="home">Home</li>
              </Link>
              <Link to="/beers">
                <li id="beers">Beers</li>
              </Link>
              <Link to="/dining">
                <li id="dining">Dining</li>
              </Link>
              <Link to="/about">
                <li id="about">About</li>
              </Link>
              {/* {searchComp && <Link to="#"><li className='orderOnline'>Order Online</li></Link>} */}
            </ul>
          </div>
        )}
        {cartComp && (
          <Link to="/cartitems">
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
          <img width="35" src="/user-circle-svgrepo-com.svg" alt="external-user-circle-users-dashed-line-kawalan-studio" />
        </div>
      </div>
    </>
  );
}
