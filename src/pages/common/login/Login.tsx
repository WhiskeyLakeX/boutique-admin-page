import React, { useState } from "react";
import "./index.scss";
import InputField from "../../../module/component/input-field/custom-input-field/InputField";
import LoginBtn from "../../../module/component/button/custom-login-btn/LoginBtn";

function Login() {
  const [btnStatus, setBtnStatus] = useState("login");
  const formRender = () => {
    switch (btnStatus) {
      case "login":
        return (
          <div className="login-form form">
            <div className="t-h3 t-bold form-title">Login</div>
            <InputField
              placeholder={"Username"}
              title={"Username"}
              titleDirection={"vertical"}
            />
            <InputField
              placeholder={"Password"}
              type="password"
              title={"Password"}
              titleDirection={"vertical"}
            />
            <div
              role={"button"}
              onClick={() => {
                alert("Login");
              }}
            >
              <LoginBtn
                label="Đăng nhập"
                labelClass="t-h5 t-normal"
                labelTextColor="black"
                borderRadius="5px"
                margin="20px 0px 0px 0px"
                padding="5px 20px 5px 20px"
              />
            </div>
          </div>
        );
      case "register":
        return (
          <div className="login-form form">
            <div className="t-h3 t-bold form-title">Register</div>
            <InputField
              placeholder={"Username"}
              title={"Username"}
              titleDirection={"vertical"}
            />
            <InputField
              placeholder={"Username"}
              type="password"
              title={"Password"}
              titleDirection={"vertical"}
            />
            <LoginBtn
              label="Đăng nhập"
              labelClass="t-h5 t-normal"
              labelTextColor="black"
              borderRadius="5px"
              margin="20px 0px 0px 0px"
              padding="5px 20px 5px 20px"
            />
          </div>
        );
    }
  };

  const switchSection = (event: React.MouseEvent) => {
    if (event.currentTarget.id === "login" && btnStatus === "register") {
      setBtnStatus("login");
    } else if (event.currentTarget.id === "register" && btnStatus === "login") {
      setBtnStatus("register");
    }
  };

  return (
    <div className="wrapper">
      <div className="common-login-page">
        <div></div>
        <div className="container">
          <div className="login-section-btn">
            <div
              className={`login-btn sw-btn ${
                btnStatus === "login" ? "selected-btn" : ""
              }`}
              onClick={(event) => switchSection(event)}
              id="login"
            >
              Đăng nhập
            </div>
            <div
              className={`regis-btn sw-btn ${
                btnStatus === "register" ? "selected-btn" : ""
              }`}
              onClick={(event) => switchSection(event)}
              id="register"
            >
              Đăng ký
            </div>
          </div>
          <div className="form-container">{formRender()}</div>
          <div className="float-btn">?</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
