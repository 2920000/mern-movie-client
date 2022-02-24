import React, { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import Button from "../button/Button";
import genres from "./Genres";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./header.scss";
function Header() {
  const { pathname } = useLocation();
  const headerRef = useRef();
  const nav = [
    {
      navName: "Home",
      link: "/",
    },
    {
      navName: "Movies",
      link: "/movie",
    },
    {
      navName: "Show",
      link: "/tv",
    },
    {
      navName: "Genres",
    },
    {
      navName: "Search",
      link: "/search",
    },
  ];
  const indexOfNavActive = nav.findIndex((e) => e.link === pathname);
  useEffect(() => {
    const show = () => {
      if (
        document.documentElement.scrollTop > 70 ||
        document.body.scrollTop > 70
      ) {
        headerRef.current.classList.add("fixed");
      } else {
        headerRef.current.classList.remove("fixed");
      }
    };
    window.addEventListener("scroll", show);

    return () => {
      window.removeEventListener("scroll", show);
    };
  });

  return (
    <header>
      <div ref={headerRef} className="header">
        <div className="container">
          <div className="header-flex ">
            <Link to="/">
              <h1 className="header-branch">
                <span>Lxt</span>
                <span>video</span>
              </h1>
            </Link>
            <nav className="header-nav">
              <ul className="header-nav-list">
                {nav.map((e, i) => (
                  <NavItem
                    key={i}
                    index={i}
                    indexOfNavActive={indexOfNavActive}
                    e={e}
                  />
                ))}
                <li>
                  <Button className="large">Login</Button>
                </li>
              </ul>
            </nav>
            <div className="header-bar">
              <FaBars />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

const NavItem = (props) => {
  const [showGenres,setShowGenres]=useState(false)
  const [opacity,setOpacity]=useState(0)
  const [translate,setTranslate]=useState(0)
  const hoverRef=useRef()
  const outRef=useRef()
  const handleOffGenreBox=()=>{
      setShowGenres(false)
  }
  const handleHover = () => {
     setShowGenres(true)
     hoverRef.current= setTimeout(()=>{
        setOpacity(1)
        setTranslate('10px')
    },150)
    
    clearTimeout(outRef.current)
  };
  const handleOut=()=>{
    outRef.current=setTimeout(()=>{
        setShowGenres(false)
      },150)
      setOpacity(0)
      setTranslate('-30px')
      clearTimeout(hoverRef.current)
  }
  if(props.e.navName==='Genres'){
      return  <span className="genre"
      onMouseEnter={() => {
        handleHover();
      }}
      onMouseLeave={()=>{
          handleOut()
      }}
    >
      {props.e.navName}
     { showGenres&&<ul style={{opacity:`${opacity}`,transform:`translateY(${translate})`}} className="genre-list">
        {genres.map(genre=><Link key={genre.id} onClick={handleOffGenreBox} to={`/movie/genre/${genre.id}`}><li className="genre-item" >{genre.genre}</li></Link>)}
      </ul>}
    </span>
  }
  else {
      return <li className={`${props.index === props.indexOfNavActive ? "active" : ""}`}>
        <Link to={`${props.e.link}`}>{props.e.navName}</Link>
    </li>
  }
  
};
