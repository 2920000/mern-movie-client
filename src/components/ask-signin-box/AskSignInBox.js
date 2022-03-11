import React from "react";
import ReactDom from "react-dom";
import "./ask-signin-box.scss";
function AskSignInBox({setAskSignInBox,setLoginModal}) {
  const handleLoginModal=()=>{
    setLoginModal(true)
    setAskSignInBox(false)  
  }
  return ReactDom.createPortal(
    <>
      <div className="ask-box">
      <div className="ask-box-overlay"></div>
      <div className="ask-box-modal">
        <p>Chức năng này dành cho thành viên đã đăng nhập </p>
        <p>
          <span onClick={()=>{setAskSignInBox(false)}}>Thoát</span>
          <span onClick={handleLoginModal} >Đăng nhập</span>
        </p>
      </div>
    </div>
    </>,
    document.getElementById("askSignBox")
  );
}

export default AskSignInBox;
