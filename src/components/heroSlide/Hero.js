import React, { useEffect, useState,memo } from 'react'
import './hero.scss'
import apiConfig from '../../api/apiConfig'
import tmdbApi ,{movieType}from '../../api/apiThemovie'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Button from '../button/Button'
import Spinner from '../spinner/Spinner'
function Hero() {
    const [moviesHeroSlide,setMovieHeroSlide]=useState([])
    const [load,setLoad]=useState(false)
    const params={
        page:1
    }
    useEffect(()=>{
        const fetchData=async()=>{
         const response= await  tmdbApi.getMovieList(movieType.popular,{params})
         const moviesPopular=response.results.slice(0,4)
         setMovieHeroSlide(moviesPopular)
         setLoad(true)
        }
        fetchData()
        return ()=>{   
        }
    },[])
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 600,
        autoplaySpeed: 4000,
        arrows:false,
        cssEase: "linear"
      };
  return (
    <>{load
    ?<div className='hero'>
        <section className='hero-slide'>
        <Slider {...settings}>
            {moviesHeroSlide.map(e=><MovieSlide key={e.id} e={e}/>)}
        </Slider>
        </section>
      
    </div>:
    <Spinner/>}</>
  )
}

export default memo(Hero)
const MovieSlide=({e})=>{
const backgroundHero=apiConfig.originalImage(e.backdrop_path)

      return   <div className='hero-item' >
                  {/* <img className='hero-item-image' src={`${apiConfig.originalImage(e.backdrop_path)}?tr=w-400,h-300`} alt=''  /> */}
                  <div className='placeholder' style={{backgroundImage:`url(${backgroundHero})`}} ></div>
                  <div className='container'>
                       <div className='hero-item__infor'>
                               <h4 className='hero-item-title'>{e.title}</h4>
                               <p className='hero-item-rated'>Rated {e.vote_average}</p>
                               <p className='hero-item-summary'>{e.overview}</p>
                              <Button watch={true}   movieId={e.id} className='large hover'>Watch</Button>
                       </div>
                  </div>
              </div>
}   