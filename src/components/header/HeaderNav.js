import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../button/Button";
import genres from "./Genres";
import { nav } from "./navName";
import './header.scss'  
function HeaderNav(props) {
  const { pathname } = useLocation();

  const indexOfNavActive = nav.findIndex((e) => e.link === pathname);
  return (
    <ul className={props.className}>
      {nav.map((e, i) => (
        <NavItem key={i} index={i} indexOfNavActive={indexOfNavActive} e={e} />
      ))}
      <li>
        <Button className="large">Đăng nhập</Button>
      </li>
    </ul>
  );
}

export default HeaderNav;
export const NavItem = (props) => {
  const [showGenres, setShowGenres] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [translate, setTranslate] = useState(0);
  const hoverRef = useRef();
  const outRef = useRef();
  const handleOffGenreBox = () => {
    setShowGenres(false);
  };
  const handleHover = () => {
    setShowGenres(true);
    hoverRef.current = setTimeout(() => {
      setOpacity(1);
      setTranslate("10px");
    }, 150);

    clearTimeout(outRef.current);
  };
  const handleOut = () => {
    outRef.current = setTimeout(() => {
      setShowGenres(false);
    }, 150);
    setOpacity(0);
    setTranslate("-30px");
    clearTimeout(hoverRef.current);
  };
  if (props.type === "sidebar") {
    if (props.e.className !== "search") {
      return (
        <li
          className={`${
            props.index === props.indexOfNavActive ? "active" : ""
          }  `}
        >
          <Link to={`${props.e.link}`}>{props.e.navName}</Link>
        </li>
      );
    } else {
      return "";
    }
  } else {
    if (props.e.navName === "Thể loại") {
      return (
        <span
          className="genre"
          onMouseEnter={() => {
            handleHover();
          }}
          onMouseLeave={() => {
            handleOut();
          }}
        >
          {props.e.navName}
          {showGenres && (
            <ul
              style={{
                opacity: `${opacity}`,
                transform: `translateY(${translate})`,
              }}
              className="genre-list"
            >
              {genres.map((genre) => (
                <Link
                  key={genre.id}
                  onClick={handleOffGenreBox}
                  to={`/movie/genre/${genre.id}`}
                >
                  <li className="genre-item">{genre.genre}</li>
                </Link>
              ))}
            </ul>
          )}
        </span>
      );
    } else if (props.e.className === "search") {
      return (
        <li
          className={`${
            props.index === props.indexOfNavActive ? "active" : ""
          } search  `}
        >
          <Link to={`${props.e.link}`}>{props.e.navName}</Link>
        </li>
      );
    } else {
      return (
        <li
          className={`${
            props.index === props.indexOfNavActive ? "active" : ""
          }  `}
        >
          <Link to={`${props.e.link}`}>{props.e.navName}</Link>
        </li>
      );
    }
  }
};

// const NavItemLi=(props)=>{
//     return  <li className={} ></li>
   
// }