import React, { useEffect, useRef, useState } from "react";
import Button from "../button/Button";
import { nav } from "../header/navName";
import { NavItem } from "../header/HeaderNav";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import ReactDOM from "react-dom";
import "./nav-sidebar.scss";
import LoginMoal from "../header/LoginModal";
function NavSide(props) {
  const {
    translateSidebarHeader,
    setTranslateSidebarHeader,
    overlay,
    setOverlay,
    opacityOverlay,
    setOpacityOverlay,
  } = props;
  const refSidebarHeader = useRef();
  const auth = getAuth();
  const [loginModal, setLoginModal] = useState(false);
  const [user, setUser] = useState({});
  const [loadAvatar, setLoadAvatar] = useState(false);
  const [signOutBox, setSignOutBox] = useState(false);
  const styleSidebar = {
    transform: `translateX(${translateSidebarHeader})`,
  };
  const styleOverlay = {
    opacity: opacityOverlay,
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoadAvatar(true);
      setLoginModal(false);
      setSignOutBox(false);
    });
    return () => {
      setSignOutBox(false);
    };
  }, []);
  const overlayRef = useRef();
  useEffect(() => {
    const mousedown = (e) => {
      if (e.target === overlayRef.current) {
        document.body.style.overflowY = "auto";
        document.body.style.marginRight = "0";
        setOverlay(false);
        setTranslateSidebarHeader("-250px");
        setOpacityOverlay("0");
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
    setOpacityOverlay("0");
  };
  const handleShowLoginModal = () => {
    setLoginModal(true);
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
              {loadAvatar ? (
                <div className="logged-user">
                  <div className="user-infor">
                    {" "}
                    <img className="user-avatar" src={user.photoURL} alt="" />
                    <span>{user.displayName}</span>
                  </div>
                  {signOutBox && (
                    <div className="sign-out">
                      <span>Log out</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="skeleton-avatar"></div>
              )}
            </div>
          ) : (
            <Button onClick={handleShowLoginModal} className="mobile">
              Đăng nhập
            </Button>
          )}
          <LoginMoal loginModal={loginModal} setLoginModal={setLoginModal} />
          {nav.map((e, i) => (
            <NavItem
              key={i}
              index={i}
              // indexOfNavActive={indexOfNavActive}
              e={e}
              type="sidebar"
              onClick={handLeOffNav}
            />
          ))}
        </div>
        <LoginMoal loginModal={loginModal} setLoginModal={setLoginModal} />
      </div>
    </>,
    document.getElementById("sidebar")
  );
}

export default NavSide;
