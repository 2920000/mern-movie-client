import { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import validateForm2 from "../../../validateForm/validateForm2";


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

  export default FormSignIn