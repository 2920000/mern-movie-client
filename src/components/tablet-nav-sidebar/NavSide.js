import React, { useEffect, useRef, useState } from "react";
import HeaderNav from "../header/HeaderNav";
import Button from "../button/Button";
import { nav } from "../header/navName";
import { NavItem } from "../header/HeaderNav";
import {IoClose} from 'react-icons/io5'
import ReactDOM from  'react-dom';
import "./nav-sidebar.scss";
function NavSide(props) {
  const {translateSidebarHeader,setTranslateSidebarHeader, overlay,setOverlay,opacityOverlay,setOpacityOverlay} =props
  const refSidebarHeader = useRef();
  const styleSidebar={
transform:`translateX(${translateSidebarHeader})`
  }
  const styleOverlay={
      opacity:opacityOverlay
  }
  const overlayRef=useRef()
  useEffect(()=>{
    const mousedown = (e) => {
        if (e.target === overlayRef.current) {
          document.body.style.overflowY = "auto";
          document.body.style.marginRight = "0";
            setOverlay(false);
            setTranslateSidebarHeader('-250px')
          setOpacityOverlay('0')
        }
      };
    const mousedownEvent = window.addEventListener("mousedown", mousedown);
    return () => {
        window.removeEventListener("mousedown", mousedownEvent);
      };
  })
  return ReactDOM.createPortal(
    (
        <>
          {overlay&&<div ref={overlayRef} style={styleOverlay} className="overlay"></div>}
          <div style={styleSidebar} className="header-sidebar-mobile">
            <span className="btn-close"><IoClose/></span>
            <div ref={refSidebarHeader} className="header-sidebar-link">
              <Button className='mobile' >Đăng nhập</Button>
              {nav.map((e, i) => (
                <NavItem
                  key={i}
                  index={i}
                  // indexOfNavActive={indexOfNavActive}
                  e={e}
                  type="sidebar"
                />
              ))}
            </div>
          </div>
        </>
      ),
document.getElementById('sidebar')
  )
}

export default NavSide;
