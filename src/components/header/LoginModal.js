import React, { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { GoogleLogin } from "react-google-login";
import ReactDom from "react-dom";
import useModal from "../../custom-hook/useModal";
import validateForm2 from "../../validateForm/validateForm2";
import "./login.scss";
function LoginMoal({ setUser, loginModal, setLoginModal }) {
  const [switchForm, setSwitchForm] = useState(false);
  const [checkAccount, setCheckAccount] = useState(false);
  const overlayRef = useRef();
  const contentModalRef = useRef();

  useEffect(() => {
    if (contentModalRef.current) {
      contentModalRef.current.style.backgroundColor = "white";
    }
  });

  useModal(overlayRef, setLoginModal);
  const handleSignIn = () => {};

  return ReactDom.createPortal(
    <>
      {loginModal && (
        <>
          <div className="overlay"></div>
          <div ref={overlayRef} className="login">
            <div onClick={handleSignIn} className="login-modal">
              {switchForm ? (
                <FormSignUp
                  setSwitchForm={setSwitchForm}
                  setStatus={setCheckAccount}
                />
              ) : (
                <FormSignIn
                  setUser={setUser}
                  setSwitchForm={setSwitchForm}
                  setLoginModal={setLoginModal}
                  setStatus={setCheckAccount}
                />
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

const FormSignIn = ({ setUser, setSwitchForm, setLoginModal, setStatus }) => {
  const [showAndHidePassword, setShowAndHidePassword] = useState(false);

  const handleSwitchForm = () => {
    setSwitchForm(true);
  };
  const handleSuccessGoogleSignin = (res) => {
    window.location.reload();
    sessionStorage.setItem(
      "profile",
      JSON.stringify({ result: res.profileObj, token: res.tokenId })
    );
    setLoginModal(false);

  };
  const handleFailureGoogleSignin = () => {};
  const handleShowAndHidePassword = () => {
    setShowAndHidePassword(!showAndHidePassword);
  };

  useEffect(() => {
    validateForm2("signin-form", null, setStatus, setLoginModal, setUser);
  });
  return (
    <>
      <h3 className="login-modal-title">Đăng nhập</h3>

      <form className="form" id="signin-form" method="POST">
        <div className="form-group">
          <label htmlFor="signinName">Tên đăng nhập</label>
          <input
            id="signinName"
            className="form-input"
            name="signinName"
            placeholder="Nhập tên đăng nhập"
            rules="required"
          />
          <span className="error-message"></span>
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type={showAndHidePassword ? "" : "password"}
            id="password"
            className="form-input"
            name="password"
            placeholder="Nhập mật khẩu"
            rules="required"
            autoComplete="on"
          />

          <span className="error-message"></span>
          {showAndHidePassword ? (
            <AiOutlineEyeInvisible
              onClick={handleShowAndHidePassword}
              className="showpassword-icon"
            />
          ) : (
            <AiOutlineEye
              onClick={handleShowAndHidePassword}
              className="showpassword-icon"
            />
          )}
        </div>
        <div className="text-signup">
          <span onClick={handleSwitchForm}>Đăng ký</span>
        </div>
        <button type="submit" className="btn-signin">
          Đăng nhập
        </button>
      </form>
      <GoogleLogin
        clientId="873672031027-pnd82mi7le24kau35brpbk0kadmso9r5.apps.googleusercontent.com"
        render={(renderProps) => {
          return (
            <button onClick={renderProps.onClick} className="btn-googleLogin">
              <span className="btn-googleLogin-icon">
                <FcGoogle />
              </span>
              Đăng nhập với Google
            </button>
          );
        }}
        onSuccess={handleSuccessGoogleSignin}
        onFailure={handleFailureGoogleSignin}
        cookiePolicy="single_host_origin"
      />
    </>
  );
};

const FormSignUp = ({ setSwitchForm, setStatus }) => {
  const initialFormData = {
    signinName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSwitchForm = () => {
    setSwitchForm(false);
  };
  const handleChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    validateForm2("signup-form", setSwitchForm, setSignupSuccess);
  });

  return (
    <>
      {!signupSuccess ? (
        <>
          <h3 className="login-modal-title">Đăng ký</h3>
          <form className="form" id="signup-form" method="POST">
            <div className="form-group">
              <label htmlFor="signinName">Tên đăng nhập</label>
              <input
                id="signinName"
                className="form-input"
                name="signinName"
                placeholder="Nhập tên đăng nhập"
                onChange={handleChangeInput}
                rules="required"
              />
              <span className="error-message"></span>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="form-input"
                name="email"
                placeholder="Nhập email"
                onChange={handleChangeInput}
                rules="required|email"
              />
              <span className="error-message"></span>
            </div>
            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <div>
                <input
                  id="password"
                  className="form-input"
                  name="password"
                  placeholder="Nhập mật khẩu"
                  type="password"
                  onChange={handleChangeInput}
                  rules="required|minPassword:6"
                />
                <span className="error-message"></span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword"> Nhập lại mật khẩu</label>
              <input
                id="confirmPassword"
                className="form-input"
                type="password"
                name="confirmPassword"
                placeholder="Nhập lại mật mật khẩu"
                onChange={handleChangeInput}
                rules="required|confirmPassword"
              />
              <span className="error-message"></span>
            </div>
            <button type="submit" className="btn-signup ">
              Đăng ký
            </button>
            <div className="isAccout">
              Đã có tài khoản? <span onClick={handleSwitchForm}>Đăng nhập</span>
            </div>
          </form>
        </>
      ) : (
        <div className="success-box">
          <div>
            <BsCheckCircleFill className="success-icon" />
          </div>
          Đăng ký thành công!
          <span
            onClick={() => {
              setSwitchForm(false);
            }}
          >
            Đăng nhập
          </span>
        </div>
      )}
    </>
  );
};
