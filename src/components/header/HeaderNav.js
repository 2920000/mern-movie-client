import React, { useState, useRef, memo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";
import { nav } from "./navName";
import Button from "../button/Button";
import genres from "./Genres";
import LoginModal from "./LoginModal";
import "./header.scss";
function HeaderNav(props) {
  const [loginModal, setLoginModal] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("profile"))
  );
  const [signOutBox, setSignOutBox] = useState(false);
  const { pathname } = useLocation();

  const indexOfNavActive = nav.findIndex((e) => e.link === pathname);

  const loginModalProps = {
    setUser,
    loginModal,
    setLoginModal,
  };

  const handleShowLoginModal = () => {
    setLoginModal(true);
  };

  const handleSignOutBox = () => {
    setSignOutBox(!signOutBox);
  };

  const handleSignOut = () => {
    window.location.reload();
    sessionStorage.removeItem("profile");
    setSignOutBox(false);
  };

  return (
    <ul className={props.className}>
      {nav.map((e, i) => (
        <NavItem key={i} index={i} indexOfNavActive={indexOfNavActive} e={e} />
      ))}
      <li>
        {user ? (
          <div>
            <div className="logged-user">
              {user.result.imageUrl ? (
                <img
                  onClick={handleSignOutBox}
                  className="user-avatar"
                  src={user.result.imageUrl}
                  alt=""
                />
              ) : (
                <div onClick={handleSignOutBox}>
                  <img
                    className="user-customAvatar"
                    src="https://p1.hiclipart.com/preview/110/885/214/green-circle-child-avatar-user-profile-smile-boy-cartoon-face-png-clipart.jpg"
                    alt=""
                  />
                </div>
              )}

              {signOutBox && (
                <div onClick={handleSignOut} className="sign-out">
                  <span>Log out</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Button onClick={handleShowLoginModal} className="large">
            Đăng nhập
          </Button>
        )}
        <LoginModal {...loginModalProps} />
      </li>
    </ul>
  );
}

export default HeaderNav;

// export const NavItem=(props)=>{
//    return (
//         <li
//           className={`${
//             props.index === props.indexOfNavActive ? "active" : ""
//           }  `}
//         >
//           <Link to={`${props.e.link}`}>{props.e.navName}</Link>
//         </li>
//       );
// }
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
    if (props.e.className !== "search" && props.e.className !== "genre") {
      return (
        <li
          className={`${
            props.index === props.indexOfNavActive ? "active" : ""
          }  `}
        >
          <Link onClick={props.onClick} to={`${props.e.link}`}>
            {props.e.navName}
          </Link>
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
          <Link to={`${props.e.link}`}>
            <MdOutlineSearch className="search-icon" />
            <span className="search-text">{props.e.navName}</span>
          </Link>
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
