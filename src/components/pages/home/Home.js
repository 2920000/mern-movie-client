import React, { useEffect, useRef, useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { movieType, tvType } from "../../../api/apiThemovie";
import { useNavigate } from "react-router-dom";
import Hero from "../../heroSlide/Hero";
import MovieList from "../../movie-list/MovieList";
import MovieSidebar from "../../movie-sidebar/MovieSidebar";
import Button from "../../button/Button";
import "./home.scss";
function Home() {
  const [category, setCategory] = useState("movie");
  const btnUpRef = useRef();

  const handleSwitch = (value) => {
    setCategory(value);
  };

  const handleUpToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  
  useEffect(() => {
    window.addEventListener("scroll", (event) => {
      if (btnUpRef.current) {
        if (window.pageYOffset > 330) {
          btnUpRef.current.style.opacity = "1";
        } else {
          btnUpRef.current.style.opacity = "0";
        }
      }
    });
  });

  return (
    <main>
      <section>
        <Hero />
      </section>
      <section className="container-movie">
        <div className="home-flex">
          <div className="home-left">
            <HomeMain />
          </div>

          <div className="home-right">
            <h2 className="home-right-title">BẢNG XẾP HẠNG</h2>
            <div className="home-right-movie__sidebar">
              <div className="trending-catalog">
                <h4
                  className="trending-catalog__movie"
                  style={
                    category === "movie"
                      ? { borderBottom: "3px solid red" }
                      : { borderBottom: "3px solid #06121e" }
                  }
                  onClick={() => {
                    handleSwitch("movie");
                  }}
                >
                  PHIM LẺ
                </h4>
                <h4
                  className="trending-catalog__tv"
                  style={
                    category === "tv"
                      ? { borderBottom: "3px solid red" }
                      : { borderBottom: "3px solid #06121e" }
                  }
                  onClick={() => {
                    handleSwitch("tv");
                  }}
                >
                  PHIM BỘ
                </h4>
              </div>
              <div className="trending">
                <MovieSidebar
                  categorySidebar={category}
                  className="home-sidebar"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div ref={btnUpRef} onClick={handleUpToTop} className="btn-up">
        <BsFillArrowUpCircleFill />
      </div>
    </main>
  );
}

export default Home;

export const HomeMain = () => {
  const navigate = useNavigate();

  const mainCatalogList = [
    {
      catalog: "PHIM PHỔ BIẾN",
      type: movieType.popular,
    },
    {
      catalog: "PHIM SẮP CHIẾU",
      type: movieType.upcoming,
    },
    {
      catalog: "TOP PHIM ĐÁNH GIÁ CAO",
      type: movieType.top_rated,
    },
    
  ];

  return (
    <>
      {mainCatalogList.map((e, i) => (
        <section key={i} id={e.type} className="home-left-list">
          <div className="catalog">
            <h3>{e.catalog}</h3>
            <Button
              onClick={() => {
                navigate(`${e.type}/page/1`);
              }}
              className="small hover"
            >
              Xem tất cả
            </Button>
          </div>
          <MovieList className="movie-list" type={e.type} />
        </section>
      ))}
    </>
  );
};
