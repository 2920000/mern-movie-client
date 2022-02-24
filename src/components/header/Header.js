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
      navName: "Trang Chủ",
      link: "/",
    },
    {
      navName: "Phim Lẻ",
      link: "/movie/page/1",
    },
    {
      navName: "Phim Bộ",
      link: "/tv/page/1",
    },
    {
      navName: "Thể loại",
    },
    {
      navName: "Tìm Kiếm",
      link: "/search",
      className:'search'
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
             <div className="header-flex-tablet">
                <div className="header-bar">
                  <FaBars />
                </div>
                <Link to="/">
                  <h1 className="header-branch">
                    <span>Lxt</span>
                    <span>video</span>
                  </h1>
                </Link>
             </div>
            <nav className="header-nav ">
              <ul className="header-nav-list oke">
                {nav.map((e, i) => (
                  <NavItem
                    key={i}
                    index={i}
                    indexOfNavActive={indexOfNavActive}
                    e={e}
                    
                  />
                ))}
                <li>
                  <Button className="large">Đăng nhập</Button>
                </li>
              </ul>
            </nav>
           
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
  console.log(props)
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
  if(props.e.navName==='Thể loại'){
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
  else if(props.e.className==='search'){
    return <li className={`${props.index === props.indexOfNavActive ? "active" : ""} search  `  }>
    <Link to={`${props.e.link}`}>{props.e.navName}</Link>
</li>

  }
  else {
      return <li className={`${props.index === props.indexOfNavActive ? "active" : ""}  `}>
        <Link to={`${props.e.link}`}>{props.e.navName}</Link>
    </li>
  }
  
};
