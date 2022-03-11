import { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import validateForm2 from "../../../validateForm/validateForm2";

const FormSignUp = ({ setSwitchForm }) => {
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

  export default FormSignUp