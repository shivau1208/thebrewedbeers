import React, { useContext, useEffect } from 'react'
import { BeersContext } from '../../context/contextapi'
import './home.css'
import SingleBeer from '../../components/singleBeer'
import Footer from '../../components/footer/footer'



export default function ListBeers() {
    const {data,setShow} = useContext(BeersContext)
    const {initSlider} = newFunction()
    useEffect(()=>{
        setShow(true)
    },[])
    return (
        <div className='home'>
            <div className='beerContainer'>
                {data.filter((beer,index)=>index in [0,1,2,3,4,5]).map((beer, index) =>
                    <SingleBeer key={index} beer={beer} />
                )}
                <button className="btn " id='btn-prev' onClick={initSlider}>{'<'}</button>
                <button className="btn " id='btn-next' onClick={initSlider}>{'>'}</button>
            </div>
            <Footer />
        </div>
    )
}
function newFunction() {
    const initSlider = ()=>{
        const beerList = document.querySelector('.beerContainer');
        const slideButtons = document.querySelectorAll('.beerContainer .btn')
        slideButtons.forEach(button=>{
            button.addEventListener('click',function(){
                const direction = button.id==='btn-prev' ? -1 : 1;
                const scrollAmount = beerList.clientWidth * direction;
                beerList.scrollBy({left:scrollAmount,behavior:'smooth'})
            })
        })
    }
    // const nextSlide = ()=>{
    //     let beer = document.querySelector('.beerContainer')
    //     if(beer){
    //         beer.scrollTo({
    //             left:beer.scrollLeft+beer.firstElementChild.offsetWidth,
    //             behavior:"smooth"
    //         })
    //     }
    // }
    
    // const prevSlide = ()=>{
    //     let beer = document.querySelector('.beerContainer')
    //     if(beer){
    //         beer.scrollTo({
    //             left:beer.scrollLeft-beer.firstElementChild.offsetWidth,
    //             behavior:"smooth"
    //         })
    //     }
    // }
    return {initSlider}
}

