import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import {FcGoogle} from 'react-icons/fc'
import {GoogleAuthProvider,getAuth,signInWithPopup} from 'firebase/auth'
import { app } from "../../firebaseConfig";
import useModal from "../../custom-hook/useModal";
import "./login.scss";
function LoginMoal({loginModal,setLoginModal}) {
  const provider = new GoogleAuthProvider()
  const auth= getAuth()
  const overlayRef=useRef()
  const contentModalRef=useRef()
useEffect(()=>{
  if(contentModalRef.current){
    contentModalRef.current.style.backgroundColor='white'
  }
})
 useModal(overlayRef,setLoginModal)
  const handleSignIn=()=>{
  signInWithPopup(auth,provider)
  }
  return ReactDom.createPortal(
    <>
     {loginModal&&<>
      <div  className="overlay"></div>
      <div ref={overlayRef} className="login">
          <div onClick={handleSignIn}   className="login-modal">
            <p ref={contentModalRef} ><FcGoogle   className="login-icon"/>Đăng nhập với Google</p>
          </div>
      </div>
     </> }
    </>,
    document.getElementById("login")
  );
}

export default LoginMoal;
