import React, { useEffect, useRef, useState } from "react";
import { nav } from "../header/navName";
import { NavItem } from "../header/HeaderNav";
import { HiChevronDown } from "react-icons/hi";
import ReactDOM from "react-dom";
import LoginMoal from "../header/LoginModal";
import Button from "../button/Button";
import "./nav-sidebar.scss";
function NavSide(props) {
  const {
    translateSidebarHeader,
    setTranslateSidebarHeader,
    overlay,
    setOverlay,
    opacityOverlay,
  } = props;

  const boxLogoutStyle = {
    transform: "translateY(10px)",
    opacity: "1",
    position: "relative",
    zIndex: "1",
  };

  const initialBoxLogoutStyle = {
    transform: "translateY(-10px)",
    opacity: "0",
    position: "absolute",
    zIndex: "-10",
  };
  
  const refSidebarHeader = useRef();
  const boxLogoutRef = useRef();
  const [loginModal, setLoginModal] = useState(false);
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('profile')));
  const [boxLogout, setBoxLogout] = useState(false);
  const styleSidebar = {
    transform: `translateX(${translateSidebarHeader})`,
  };
  const styleOverlay = {
    opacity: opacityOverlay,
  };
  useEffect(() => {
  
  }, []);
  const overlayRef = useRef();
  useEffect(() => {
    const mousedown = (e) => {
      if (e.target === overlayRef.current) {
        document.body.style.overflowY = "auto";
        document.body.style.marginRight = "0";
        setOverlay(false);
        setTranslateSidebarHeader("-250px");
      }
    };
    const mousedownEvent = window.addEventListener("mousedown", mousedown);
    return () => {
      window.removeEventListener("mousedown", mousedownEvent);
      };
  });
  const handLeOffNav = () => {
    setOverlay(false);
    setTranslateSidebarHeader("-250px");
    window.document.body.style.overflowY='auto'
  };
  const handleShowLoginModal = () => {
    setLoginModal(true);
  };
  const handleShowLogoutBox = () => {
    setBoxLogout(!boxLogout);
  };
  const handleLogout = () => {
    window.location.reload()
    sessionStorage.removeItem('profile')
  };
  return ReactDOM.createPortal(
    <>
      {overlay && (
        <div ref={overlayRef} style={styleOverlay} className="overlay"></div>
      )}
      <div style={styleSidebar} className="header-sidebar-mobile">
        <div ref={refSidebarHeader} className="header-sidebar-link">
          {user ? (
            <div>
                <div className="logged-user">
                  <div onClick={handleShowLogoutBox} className="user-infor">
                    {" "}
                    <img className="user-avatar" src={user.result.imageUrl} alt="" />
                    <span>{user.result.name||user.result.signinName}</span>
                    <HiChevronDown />
                  </div>
                  <div
                    onClick={handleLogout}
                    ref={boxLogoutRef}
                    style={boxLogout ? boxLogoutStyle : initialBoxLogoutStyle}
                    className="sidebar-sign-out"
                  >
                    <span>Log out</span>
                  </div>
                </div>
            </div>
          ) : (
            <Button onClick={handleShowLoginModal} className="mobile">
              Đăng nhập
            </Button>
          )}
          {nav.map((e, i) => (
            <NavItem
              key={i}
              index={i}
              e={e}
              type="sidebar"
              onClick={handLeOffNav}
            />
          ))}
        </div>
        <LoginMoal setUser={setUser} loginModal={loginModal} setLoginModal={setLoginModal}  />
      </div>
    </>,
    document.getElementById("sidebar")
  );
}

export default NavSide;
