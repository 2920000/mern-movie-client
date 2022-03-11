import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import useModal from "../../custom-hook/useModal";
import "./login.scss";
import FormSignIn from "../form/form-signin/FormSignIn";
import FormSignUp from "../form/form-signup/FormSignUp";
function LoginMoal({ setUser, loginModal, setLoginModal }) {
  const [switchForm, setSwitchForm] = useState(false);
  const [checkAccount, setCheckAccount] = useState(false);
  const overlayRef = useRef();
  const contentModalRef = useRef();

  const formSignInProps = {
    setUser,
    setSwitchForm,
    setLoginModal,
    setStatus: setCheckAccount,
  };
  const formSignUpProps = {
    setSwitchForm,
    setStatus: setCheckAccount,
  };
  useEffect(() => {
    if (contentModalRef.current) {
      contentModalRef.current.style.backgroundColor = "white";
    }
  });

  useModal(overlayRef, setLoginModal);

  return ReactDom.createPortal(
    <>
      {loginModal && (
        <>
          <div className="overlay"></div>
          <div ref={overlayRef} className="login">
            <div className="login-modal">
              {switchForm ? (
                <FormSignUp {...formSignUpProps} />
              ) : (
                <FormSignIn {...formSignInProps} />
              )}
              {checkAccount ? (
                <div className="login-loading-box">
                  <span className="login-loading"></span>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      )}
    </>,
    document.getElementById("login")
  );
}

export default LoginMoal;




