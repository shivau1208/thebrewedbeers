import React, { useContext, useEffect } from 'react'
import './navBar.css'
import styled from 'styled-components'
import { BeersContext } from '../../context/contextapi';
import {Link} from 'react-router-dom'

const Cart = styled.div`
    position:relative;
    cursor:pointer;
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
    padding:0.5rem;
`;


export default function Navbar() {
    const { cartItems,show,setShow } = useContext(BeersContext)

    function Close() {
        let sidebar = document.querySelector('.sidebarTabs')
        sidebar.style.width = '0px'
    }
    function MenuIcon() {
        let sidebar = document.querySelector('.sidebarTabs')
        sidebar.style.width = '200px'
    }
    useEffect(()=>{
        setShow(true)
    },[])
    

    return (
        <div>
            <div className="sidebarTabs">
                <div className='close' >
                    <img src="/close-square-svgrepo-com.svg" alt="close" srcSet="" width='30' onClick={Close} />
                </div>
                <div className="sideList">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="#">About</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="#">Contact Us</Link></li>
                    </ul>
                </div>
            </div>
            <div className='navBar'>
                <div className='menuIcon' onClick={MenuIcon} >
                    <img src="/menu-alt-1-svgrepo-com.svg" alt="menu" srcSet="" width='35' />
                </div>
                <div className='logo'>
                    <img width="35" src="/beer-mug-2-svgrepo-com.svg" alt="logo" />
                </div>
                {show && <div className='searchBar'>
                    <img width='25' src="/search-svgrepo-com.svg" alt="" srcSet="" />
                    <input type="text" name="" id="input" />
                </div>}
                <div className="navbarTabs">
                    <ul className='menuList'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="#">About</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="#">Contact Us</Link></li>
                    </ul>
                </div>
                {show && <Cart className='cart'>
                    <Link to="/cartitems">
                        <img width='35' src="/cart-large-minimalistic-svgrepo-com.svg" alt="" srcSet="" />
                    </Link>
                    <CartItems>{cartItems.length}</CartItems>
                </Cart>}
                <div className='account'>
                    <img width="35" src="/user-circle-svgrepo-com.svg" alt="external-user-circle-users-dashed-line-kawalan-studio" />
                </div>
            </div>
        </div>
    )
}
