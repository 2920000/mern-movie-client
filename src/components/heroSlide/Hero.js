import React, { useEffect, useState, memo } from "react";
import tmdbApi, { movieType } from "../../api/apiThemovie";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Skeleton from '../skeleton/Skeleton'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./hero.scss";
import MovieSlide from "./MovieSlide";

function Hero() {
  const [moviesHeroSlide, setMovieHeroSlide] = useState([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const params = {
    page: 1,
    language:'vi-VN'
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await tmdbApi.getMovieList(movieType.popular, {
        params,
      });
      const moviesPopular = response.results.slice(0,4);
      setMovieHeroSlide(moviesPopular);
      setLoad(true);
    };
    fetchData();
    return () => {};
  }, []);
  
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 4000,
    arrows: false,
    cssEase: "linear",
  };
  return (
    <>
      {load ? (
        <div className="hero">
          <section className="hero-slide">
            <Slider {...settings}>
              {moviesHeroSlide.map((e) => (
                <MovieSlide navigate={navigate} key={e.id} e={e} />
              ))}
            </Slider>
          </section>
        </div>
      ) : (
       <Skeleton className='loading-hero'/>
      )}
    </>
  );
}

export default memo(Hero);
