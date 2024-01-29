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

export const AddClass = ()=>{
    let lis = document.querySelectorAll('li')
    for (var i=0;i<lis.length;i++){
        lis[i].addEventListener('click',function(){
            var current = document.getElementsByClassName('active')
            if(current.length>0){
                current[0].classList.remove('active')
            }
            this.classList.add('active')
        })
    }
}
export const removeClass = ()=>{
    let lis = document.querySelectorAll('li')
    lis.forEach(li=>li.className = '')
}
export default function Navbar() {
    const { cartItems,show,setShow} = useContext(BeersContext)

    function Close() {
        let sidebar = document.querySelector('.sidebarTabs')
        sidebar.style.width = '0px'
        removeClass()
    }
    function MenuIcon() {
        let sidebar = document.querySelector('.sidebarTabs')
        sidebar.style.width = '200px'
    }
    
    useEffect(()=>{
        AddClass()
    },[])

    

    return (
        <div>
            <div className="sidebarTabs">
                <div className='close' >
                    <img src="/close-square-svgrepo-com.svg" alt="close" srcSet="" width='30' onClick={Close} />
                </div>
                <div className="sideList">
                    <ul>
                        <Link to="/home"><li>Home</li></Link>
                        <Link to="/beers"><li>Beers</li></Link>
                        <Link to="#"><li>Dining</li></Link>
                        <Link to="/about"><li>About</li></Link>
                    </ul>
                </div>
            </div>
            <div className='navBar'>
                <div className='menuIcon' onClick={MenuIcon} >
                    <img src="/menu-alt-1-svgrepo-com.svg" alt="menu" srcSet="" width='35' />
                </div>
                <div className='logo' style={{cursor:'pointer'}} onClick={()=>{window.location.replace(window.location.origin)} }>
                    <img width="35" src="/beer-mug-2-svgrepo-com.svg" alt="logo" />
                </div>
                {show && <div className='searchBar'>
                    <img width='25' src="/search-svgrepo-com.svg" alt="" srcSet="" />
                    <input type="text" name="" id="input" />
                </div>}
                <div className="navbarTabs">
                    <ul className='menuList'>
                    <li><Link to="/home">Home</Link></li>
                        <Link to="/beers"><li>Beers</li></Link>
                        <Link to="#"><li>Dining</li></Link>
                        <Link to="/about"><li>About</li></Link>
                        {/* {show && <Link to="#"><li className='orderOnline'>Order Online</li></Link>} */}
                    </ul>
                </div>
                {show && <Link to="/cartitems"> 
                    <Cart className='cart' onClick={()=>removeClass()}>
                        <img width='35' src="/cart-large-minimalistic-svgrepo-com.svg" alt="" srcSet="" />
                    {cartItems.length ? <CartItems>{cartItems.length}</CartItems> : ''}
                    </Cart>
                </Link>}
                {/* <div onClick={()=>toggleTheme()}>
                    {theme ? <div className='theme'><img src="/sun-svgrepo-com.svg" alt="darkTheme" srcset="" width='30' /></div> : <div className='theme'><img src="/moon-svgrepo-com.svg" alt="darkTheme" srcset="" width='30' /></div>}
                </div> */}
                <div className='account'>
                    <img width="35" src="/user-circle-svgrepo-com.svg" alt="external-user-circle-users-dashed-line-kawalan-studio" />
                </div>
            </div>
        </div>
    )
}
