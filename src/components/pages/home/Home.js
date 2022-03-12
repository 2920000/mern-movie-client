import React, { useEffect, useRef} from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import Hero from "../../heroSlide/Hero";
import "./home.scss";
import HomeMainLeft from "./HomeMainLeft";
import HomeMainRight from "./HomeMainRight";
function Home() {
  const btnUpRef = useRef();
  const handleUpToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  console.log('run')
  
  useEffect(() => {
    document.title='Phim Hay'
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
            <HomeMainLeft />
            <HomeMainRight/>
        </div>
      </section>
      <div ref={btnUpRef} onClick={handleUpToTop} className="btn-up">
        <BsFillArrowUpCircleFill />
      </div>
    </main>
  );
}

export default Home;

