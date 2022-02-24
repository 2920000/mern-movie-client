import React, { useEffect, useRef, useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { movieType } from "../../../api/apiThemovie";
import { useNavigate } from "react-router-dom";
import Hero from "../../heroSlide/Hero";
import MovieList from "../../movie-list/MovieList";
import MovieSidebar from "../../movie-sidebar/MovieSidebar";
import Button from "../../button/Button";
import "./home.scss";
function Home() {
  const navigate = useNavigate();
  const [catalog, setCatalog] = useState("movie");
  const btnUpRef = useRef();
  const handleSwitch = (value) => {
    setCatalog(value);
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
  //      const positionYRef=useRef()
  //      const [position,setPosition]=useState()
  //     useEffect(()=>{
  //      window.scrollTo(0,0)
  //      const positionOfElement=positionYRef.current.offsetTop -700
  //      console.log(positionOfElement)
  //      window.addEventListener('scroll',e=>{
  //           console.log(window.scrollY,positionYRef.current.offsetTop)
  //           if(window.scrollY>positionOfElement){

  //       console.log('fetch')
  //           }
  //      })
  //     },[])
  return (
    <main>
      <section>
        <Hero />
      </section>
      <section className="container-movie">
        <div className="home-flex">
          <div className="home-left">
            <section className="home-left-list">
              <div className="catalog">
                <h3>Popular movies</h3>
                <Button
                  onClick={() => {
                    navigate(`${movieType.popular}/page/1`);
                  }}
                  className="small"
                >
                  View all
                </Button>
              </div>
              <MovieList type={movieType.popular} />
            </section>
            <section className="home-left-list">
              <div className="catalog">
                <h3>Upcoming movies</h3>
                <Button
                  onClick={() => {
                    navigate(`${movieType.upcoming}/page/1`);
                  }}
                  className="small"
                >
                  View all
                </Button>
              </div>
              <MovieList type={movieType.upcoming} />
            </section>
            <section className="home-left-list">
              <div className="catalog">
                <h3>Top rated movies</h3>
                <Button
                  onClick={() => {
                    navigate(`${movieType.top_rated}/page/1`);
                  }}
                  className="small"
                >
                  View all
                </Button>
              </div>
              <MovieList type={movieType.top_rated} />
            </section>
          </div>

          <div className="home-right">
            <h2 className="home-right-title">Trending</h2>
            <div className="home-right-movie__sidebar">
              <div className="trending-catalog">
                <h4
                  className="trending-catalog__movie"
                  style={
                    catalog === "movie"
                      ? { borderBottom: "3px solid red" }
                      : { borderBottom: "3px solid #06121e" }
                  }
                  onClick={() => {
                    handleSwitch("movie");
                  }}
                >
                  Movies
                </h4>
                <h4
                  className="trending-catalog__tv"
                  style={
                    catalog === "tv"
                      ? { borderBottom: "3px solid red" }
                      : { borderBottom: "3px solid #06121e" }
                  }
                  onClick={() => {
                    handleSwitch("tv");
                  }}
                >
                  Tv
                </h4>
              </div>
              <div className="trending">
                <MovieSidebar catalog={catalog} />
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
